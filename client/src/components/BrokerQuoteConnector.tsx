import { MapView } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Locale = "fr" | "en";

type BrokerQuoteState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  driverAge: string;
  postalCode: string;
  accidentCount: string;
  ticketCount: string;
  priorInsurance: string;
  historyNotes: string;
};

type PostalLookupState = {
  status: "idle" | "loading" | "valid" | "outside" | "invalid" | "error";
  normalizedPostalCode: string;
  label: string;
  isMontreal: boolean;
};

type Props = {
  locale: Locale;
};

type VehicleTier = "luxury" | "standard" | "neutral";

const luxuryVehicleBrands = [
  "mercedes",
  "mercedes-benz",
  "bmw",
  "tesla",
  "audi",
  "porsche",
  "lexus",
  "land rover",
  "range rover",
  "jaguar",
  "maserati",
  "ferrari",
  "lamborghini",
  "bentley",
  "rolls-royce",
  "rolls royce",
  "cadillac",
];

const standardVehicleBrands = [
  "honda",
  "toyota",
  "hyundai",
  "kia",
  "mazda",
  "nissan",
  "subaru",
  "ford",
  "chevrolet",
  "volkswagen",
];

const initialState: BrokerQuoteState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  driverAge: "",
  postalCode: "",
  accidentCount: "0",
  ticketCount: "0",
  priorInsurance: "active",
  historyNotes: "",
};

const copy = {
  fr: {
    eyebrow: "Formulaire de soumission auto dynamique",
    titleStart: "Un moteur de soumission",
    titleHighlight: "année, marque, modèle",
    titleEnd: " alimenté dynamiquement pour le courtage haut de gamme.",
    description:
      "Cette expérience reprend l’idée d’un formulaire automobile progressif, mais la traduit pour Cardone avec un habillage sombre, des accents métalliques argentés et une logique de triage conçue pour convertir des leads sérieux.",
    trust: "Alimenté par les données vPIC de la NHTSA pour les choix véhicule.",
    liveRateTitle: "Flux intelligent",
    liveRateBody:
      "L’année déclenche le chargement des marques, puis la marque déclenche le chargement des modèles. Les estimations continuent à utiliser votre logique montréalaise actuelle en attendant une vraie connexion assureur.",
    sections: {
      contact: "Profil du conducteur",
      vehicle: "Véhicule assuré",
      history: "Historique de conduite",
      estimate: "Lecture du dossier",
    },
    labels: {
      fullName: "Nom complet",
      email: "Adresse courriel",
      phone: "Téléphone",
      city: "Ville",
      vehicleYear: "Année",
      vehicleMake: "Marque",
      vehicleModel: "Modèle",
      driverAge: "Âge du conducteur",
      postalCode: "Code postal",
      accidentCount: "Historique de sinistres",
      ticketCount: "Infractions récentes",
      priorInsurance: "Couverture antérieure",
      historyNotes: "Notes du dossier",
    },
    placeholders: {
      fullName: "Ex. Pablo Martinez",
      email: "nom@exemple.com",
      phone: "(514) 555-0199",
      city: "Montréal",
      driverAge: "34",
      postalCode: "H1H 1L5",
      historyNotes: "Ajoutez les détails utiles pour le courtier : usage professionnel, conducteur secondaire, suspension passée, etc.",
    },
    loadingMakes: "Chargement des marques…",
    loadingModels: "Chargement des modèles…",
    selectYearFirst: "Choisissez d’abord une année",
    selectMakeFirst: "Choisissez d’abord une marque",
    noMakes: "Aucune marque trouvée",
    noModels: "Aucun modèle trouvé",
    accidentOptions: ["0 accident", "1 accident", "2+ accidents"],
    ticketOptions: ["0 contravention récente", "1 contravention récente", "2+ contraventions"],
    priorInsuranceOptions: ["Assuré actuellement", "Aucune couverture active", "Nouvel assuré / historique limité"],
    lookupTitle: "Validation d’adresse en direct",
    lookupIdle: "Entrez un code postal canadien pour déclencher une validation Montréal en temps réel.",
    lookupLoading: "Validation de l’adresse en cours…",
    lookupValid: "Adresse montréalaise confirmée automatiquement.",
    lookupOutside: "Le code postal est valide, mais l’adresse semble hors Montréal.",
    lookupInvalid: "Aucune adresse exploitable n’a été trouvée pour ce code postal.",
    lookupError: "La validation en direct est momentanément indisponible.",
    annualEstimate: "Estimation annuelle",
    monthlyEstimate: "Estimation mensuelle",
    baseRate: "Base Montréal",
    factorAge: "Facteur âge",
    factorVehicle: "Facteur véhicule",
    factorClaims: "Facteur sinistres",
    factorLocation: "Facteur localisation",
    vehicleLuxury: "Véhicule luxe / sport",
    vehicleStandard: "Véhicule standard",
    vehicleNeutral: "Véhicule à classer manuellement",
    locationMontreal: "Montréal détecté",
    locationOutside: "Secteur hors Montréal détecté",
    manualReview: "Révision manuelle requise",
    manualReviewBody:
      "Deux accidents ou plus déclenchent automatiquement une révision manuelle avant une indication plus précise du marché.",
    summaryPrompt: "Complétez le profil pour générer une estimation et enregistrer la demande dans votre base interne.",
    submit: "Enregistrer la demande",
    submitting: "Enregistrement en cours",
    success: "La demande automobile a été enregistrée dans la base interne.",
    error: "La demande n’a pas pu être enregistrée.",
    applicationCta: "Continuer vers l’application sécurisée",
    requiredMessage: "Veuillez compléter le nom, le courriel, le téléphone, l’année, la marque, le modèle, l’âge et le code postal avant l’enregistrement.",
  },
  en: {
    eyebrow: "Dynamic car insurance quote form",
    titleStart: "A premium",
    titleHighlight: "Year, Make, Model",
    titleEnd: " quote flow built for serious broker intake.",
    description:
      "This experience borrows the progressive auto-quote feeling from your reference, then translates it into Cardone’s darker, metallic language with a more premium brokerage finish.",
    trust: "Powered by NHTSA vPIC vehicle data for the Year-Make-Model flow.",
    liveRateTitle: "Smart data flow",
    liveRateBody:
      "Year selection triggers make loading, and make selection triggers model loading. The estimate still follows your current Montreal logic until a live carrier connection is added.",
    sections: {
      contact: "Driver profile",
      vehicle: "Insured vehicle",
      history: "Driving history",
      estimate: "Estimated file reading",
    },
    labels: {
      fullName: "Full name",
      email: "Email address",
      phone: "Phone",
      city: "City",
      vehicleYear: "Year",
      vehicleMake: "Make",
      vehicleModel: "Model",
      driverAge: "Driver age",
      postalCode: "Postal code",
      accidentCount: "Claims history",
      ticketCount: "Recent tickets",
      priorInsurance: "Prior coverage",
      historyNotes: "Broker notes",
    },
    placeholders: {
      fullName: "E.g. Pablo Martinez",
      email: "name@example.com",
      phone: "(514) 555-0199",
      city: "Montreal",
      driverAge: "34",
      postalCode: "H1H 1L5",
      historyNotes: "Add useful broker context such as business use, a secondary driver, prior suspension, or special underwriting notes.",
    },
    loadingMakes: "Loading makes…",
    loadingModels: "Loading models…",
    selectYearFirst: "Select a year first",
    selectMakeFirst: "Select a make first",
    noMakes: "No makes found",
    noModels: "No models found",
    accidentOptions: ["0 accidents", "1 accident", "2+ accidents"],
    ticketOptions: ["0 recent tickets", "1 recent ticket", "2+ recent tickets"],
    priorInsuranceOptions: ["Currently insured", "No active coverage", "Newly insured / limited history"],
    lookupTitle: "Live address validation",
    lookupIdle: "Enter a Canadian postal code to trigger real-time Montreal validation.",
    lookupLoading: "Validating the address…",
    lookupValid: "A Montreal address was confirmed automatically.",
    lookupOutside: "The postal code is valid, but the matched address appears to be outside Montreal.",
    lookupInvalid: "No usable address match was found for this postal code.",
    lookupError: "Live validation is temporarily unavailable.",
    annualEstimate: "Estimated annual premium",
    monthlyEstimate: "Estimated monthly premium",
    baseRate: "Montreal base rate",
    factorAge: "Age factor",
    factorVehicle: "Vehicle factor",
    factorClaims: "Claims factor",
    factorLocation: "Location factor",
    vehicleLuxury: "Luxury / sport vehicle",
    vehicleStandard: "Standard vehicle",
    vehicleNeutral: "Vehicle to classify manually",
    locationMontreal: "Montreal detected",
    locationOutside: "Outside Montreal detected",
    manualReview: "Manual review required",
    manualReviewBody:
      "Two or more accidents automatically trigger a manual review before any sharper market indication should be shown.",
    summaryPrompt: "Complete the profile to generate an estimate and store the request in your internal database.",
    submit: "Save quote request",
    submitting: "Saving request",
    success: "The car quote request was saved to the internal database.",
    error: "The request could not be saved.",
    applicationCta: "Continue to the secured application",
    requiredMessage: "Please complete the full name, email, phone, year, make, model, age, and postal code before saving.",
  },
} as const;

function normalizeQuoteValue(value: string) {
  return value.trim().toLowerCase();
}

function getAgeFactor(driverAge: number) {
  if (driverAge < 25) {
    return { factor: 1.5, bracket: "under-25" as const };
  }

  if (driverAge <= 50) {
    return { factor: 1, bracket: "25-50" as const };
  }

  return { factor: 0.85, bracket: "50-plus" as const };
}

function getVehicleFactor(vehicleDescription: string) {
  const normalized = normalizeQuoteValue(vehicleDescription);

  if (luxuryVehicleBrands.some((brand) => normalized.includes(brand))) {
    return { factor: 1.2, tier: "luxury" as VehicleTier };
  }

  if (standardVehicleBrands.some((brand) => normalized.includes(brand))) {
    return { factor: 0.9, tier: "standard" as VehicleTier };
  }

  return { factor: 1, tier: "neutral" as VehicleTier };
}

function getClaimsFactor(accidentCount: number) {
  if (accidentCount >= 2) {
    return { factor: 1.4, manualReview: true };
  }

  if (accidentCount === 1) {
    return { factor: 1.15, manualReview: false };
  }

  return { factor: 1, manualReview: false };
}

function getLocationFactor(postalCode: string) {
  const normalized = postalCode.replace(/\s+/g, "").toUpperCase();
  const isMontreal = normalized.startsWith("H");

  return {
    factor: isMontreal ? 1.1 : 1,
    isMontreal,
  };
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={className}>
      <span className="mb-3 block text-[11px] uppercase tracking-[0.28em] text-[#cbd5e1]/72">{label}</span>
      {children}
    </label>
  );
}

export default function BrokerQuoteConnector({ locale }: Props) {
  const t = copy[locale];
  const [form, setForm] = useState<BrokerQuoteState>(initialState);
  const [postalLookup, setPostalLookup] = useState<PostalLookupState>({
    status: "idle",
    normalizedPostalCode: "",
    label: "",
    isMontreal: false,
  });
  const [isMapsReady, setIsMapsReady] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const yearsQuery = trpc.quote.getVehicleYears.useQuery();
  const makesQuery = trpc.quote.getMakesByYear.useQuery(
    { year: Number(form.vehicleYear) },
    { enabled: Boolean(form.vehicleYear) },
  );
  const modelsQuery = trpc.quote.getModelsByYearMake.useQuery(
    { year: Number(form.vehicleYear), make: form.vehicleMake },
    { enabled: Boolean(form.vehicleYear && form.vehicleMake) },
  );
  const submitMutation = trpc.quote.submitCarQuote.useMutation({
    onSuccess: () => {
      setSaveSuccess(true);
      toast.success(t.success);
    },
    onError: (error) => {
      console.error(error);
      toast.error(t.error);
    },
  });

  const formatCurrency = useMemo(
    () =>
      new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  useEffect(() => {
    setForm((current) => ({
      ...current,
      vehicleMake:
        makesQuery.data?.some((option) => option.value === current.vehicleMake) ?? !current.vehicleMake
          ? current.vehicleMake
          : "",
      vehicleModel:
        modelsQuery.data?.some((option) => option.value === current.vehicleModel) ?? !current.vehicleModel
          ? current.vehicleModel
          : "",
    }));
  }, [makesQuery.data, modelsQuery.data]);

  useEffect(() => {
    const normalizedPostalCode = form.postalCode.replace(/\s+/g, "").toUpperCase();

    if (!normalizedPostalCode) {
      setPostalLookup({ status: "idle", normalizedPostalCode: "", label: "", isMontreal: false });
      return;
    }

    const canadianPostalCodePattern = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
    if (!canadianPostalCodePattern.test(normalizedPostalCode)) {
      setPostalLookup({ status: "invalid", normalizedPostalCode, label: "", isMontreal: false });
      return;
    }

    if (!isMapsReady || !window.google?.maps?.Geocoder) {
      setPostalLookup((previous) => ({ ...previous, status: "loading", normalizedPostalCode }));
      return;
    }

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      setPostalLookup((previous) => ({ ...previous, status: "loading", normalizedPostalCode }));
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: `${normalizedPostalCode}, Canada` }, (results, status) => {
        if (cancelled) return;

        if (status !== "OK" || !results?.[0]) {
          setPostalLookup({ status: "invalid", normalizedPostalCode, label: "", isMontreal: false });
          return;
        }

        const topResult = results[0];
        const addressComponents = topResult.address_components ?? [];
        const postalComponent = addressComponents.find((component) => component.types.includes("postal_code"));
        const localityParts = addressComponents
          .filter((component) =>
            component.types.some((type) =>
              ["locality", "administrative_area_level_3", "sublocality", "sublocality_level_1", "administrative_area_level_2"].includes(type),
            ),
          )
          .map((component) => component.long_name)
          .join(" ")
          .toLowerCase();
        const resolvedPostalCode = postalComponent?.long_name?.replace(/\s+/g, "").toUpperCase() ?? normalizedPostalCode;
        const isMontreal = /(montreal|montréal)/.test(`${localityParts} ${topResult.formatted_address}`.toLowerCase());

        if (resolvedPostalCode !== normalizedPostalCode) {
          setPostalLookup({ status: "invalid", normalizedPostalCode, label: topResult.formatted_address, isMontreal: false });
          return;
        }

        setPostalLookup({
          status: isMontreal ? "valid" : "outside",
          normalizedPostalCode,
          label: topResult.formatted_address,
          isMontreal,
        });
      });
    }, 320);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [form.postalCode, isMapsReady]);

  const estimate = useMemo(() => {
    const normalizedVehicleYear = form.vehicleYear.trim();
    const normalizedVehicleMake = form.vehicleMake.trim();
    const normalizedVehicleModel = form.vehicleModel.trim();
    const normalizedPostalCode = form.postalCode.trim();
    const driverAge = Number(form.driverAge);
    const accidentCount = Number(form.accidentCount);
    const vehicleDescription = `${normalizedVehicleMake} ${normalizedVehicleModel}`.trim();

    if (!normalizedVehicleYear || !normalizedVehicleMake || !normalizedVehicleModel || !normalizedPostalCode || !Number.isFinite(driverAge) || driverAge <= 0) {
      return null;
    }

    const baseAnnual = 1500;
    const age = getAgeFactor(driverAge);
    const vehicle = getVehicleFactor(vehicleDescription);
    const claims = getClaimsFactor(accidentCount);
    const lookupBackedLocation =
      postalLookup.normalizedPostalCode === normalizedPostalCode && (postalLookup.status === "valid" || postalLookup.status === "outside")
        ? { factor: postalLookup.isMontreal ? 1.1 : 1, isMontreal: postalLookup.isMontreal }
        : getLocationFactor(normalizedPostalCode);
    const annual = baseAnnual * age.factor * vehicle.factor * claims.factor * lookupBackedLocation.factor;

    return {
      annual,
      monthly: annual / 12,
      ageFactor: age.factor,
      vehicleFactor: vehicle.factor,
      claimsFactor: claims.factor,
      locationFactor: lookupBackedLocation.factor,
      vehicleTier: vehicle.tier,
      isMontreal: lookupBackedLocation.isMontreal,
      manualReview: claims.manualReview,
    };
  }, [form, postalLookup]);

  const handleField = <K extends keyof BrokerQuoteState>(key: K, value: BrokerQuoteState[K]) => {
    setSaveSuccess(false);
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleYearChange = (value: string) => {
    setSaveSuccess(false);
    setForm((current) => ({ ...current, vehicleYear: value, vehicleMake: "", vehicleModel: "" }));
  };

  const handleMakeChange = (value: string) => {
    setSaveSuccess(false);
    setForm((current) => ({ ...current, vehicleMake: value, vehicleModel: "" }));
  };

  const lookupMessage =
    postalLookup.status === "loading"
      ? t.lookupLoading
      : postalLookup.status === "valid"
        ? t.lookupValid
        : postalLookup.status === "outside"
          ? t.lookupOutside
          : postalLookup.status === "invalid"
            ? t.lookupInvalid
            : postalLookup.status === "error"
              ? t.lookupError
              : t.lookupIdle;

  const handleSubmit = async () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.vehicleYear ||
      !form.vehicleMake ||
      !form.vehicleModel ||
      !form.driverAge ||
      !form.postalCode ||
      !estimate
    ) {
      toast.error(t.requiredMessage);
      return;
    }

    await submitMutation.mutateAsync({
      locale,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      city: form.city,
      postalCode: form.postalCode.toUpperCase(),
      validatedAddress: postalLookup.label || undefined,
      driverAge: Number(form.driverAge),
      accidentCount: Number(form.accidentCount),
      ticketCount: Number(form.ticketCount),
      priorInsurance: form.priorInsurance as "active" | "inactive" | "limited",
      historyNotes: form.historyNotes,
      vehicleYear: Number(form.vehicleYear),
      vehicleMake: form.vehicleMake,
      vehicleModel: form.vehicleModel,
      estimatedAnnualPremium: Math.round(estimate.annual),
      estimatedMonthlyPremium: Math.round(estimate.monthly),
      manualReview: estimate.manualReview,
    });
  };

  return (
    <section id="broker-connector" className="relative border-y border-white/8 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))]" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="lg:sticky lg:top-10">
            <p className="vault-eyebrow text-[#cbd5e1]">{t.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-white md:text-6xl">
              {t.titleStart} <span className="bg-[linear-gradient(135deg,#f8fafc_0%,#cbd5e1_45%,#94a3b8_100%)] bg-clip-text text-transparent">{t.titleHighlight}</span>
              {t.titleEnd}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{t.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/12 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{t.baseRate}</p>
                <p className="mt-3 text-2xl text-white">{formatCurrency.format(1500)}</p>
                <p className="mt-2 text-sm text-slate-400">{t.trust}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/12 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{t.liveRateTitle}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{t.liveRateBody}</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(3,7,18,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.16),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_34%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:30px_30px]" />
            <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
              <MapView className="h-0 w-0" initialCenter={{ lat: 45.554, lng: -73.637 }} initialZoom={10} onMapReady={() => setIsMapsReady(true)} />
            </div>

            <div className="relative grid gap-8 xl:grid-cols-[0.96fr_1.04fr]">
              <div className="grid gap-5">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/14 bg-white/8 text-slate-100">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{t.sections.contact}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t.labels.fullName} className="md:col-span-2">
                      <input value={form.fullName} onChange={(event) => handleField("fullName", event.target.value)} placeholder={t.placeholders.fullName} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white placeholder:text-slate-500" />
                    </Field>
                    <Field label={t.labels.email}>
                      <input value={form.email} onChange={(event) => handleField("email", event.target.value)} placeholder={t.placeholders.email} type="email" className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white placeholder:text-slate-500" />
                    </Field>
                    <Field label={t.labels.phone}>
                      <input value={form.phone} onChange={(event) => handleField("phone", event.target.value)} placeholder={t.placeholders.phone} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white placeholder:text-slate-500" />
                    </Field>
                    <Field label={t.labels.city} className="md:col-span-2">
                      <input value={form.city} onChange={(event) => handleField("city", event.target.value)} placeholder={t.placeholders.city} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white placeholder:text-slate-500" />
                    </Field>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/14 bg-white/8 text-slate-100">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{t.sections.vehicle}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label={t.labels.vehicleYear}>
                      <select value={form.vehicleYear} onChange={(event) => handleYearChange(event.target.value)} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white">
                        <option value="">{t.selectYearFirst}</option>
                        {(yearsQuery.data ?? []).map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={t.labels.vehicleMake}>
                      <select value={form.vehicleMake} onChange={(event) => handleMakeChange(event.target.value)} disabled={!form.vehicleYear || makesQuery.isLoading} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white disabled:opacity-60">
                        <option value="">{!form.vehicleYear ? t.selectYearFirst : makesQuery.isLoading ? t.loadingMakes : makesQuery.data?.length ? t.labels.vehicleMake : t.noMakes}</option>
                        {(makesQuery.data ?? []).map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={t.labels.vehicleModel}>
                      <select value={form.vehicleModel} onChange={(event) => handleField("vehicleModel", event.target.value)} disabled={!form.vehicleMake || modelsQuery.isLoading} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white disabled:opacity-60">
                        <option value="">{!form.vehicleMake ? t.selectMakeFirst : modelsQuery.isLoading ? t.loadingModels : modelsQuery.data?.length ? t.labels.vehicleModel : t.noModels}</option>
                        {(modelsQuery.data ?? []).map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label={t.labels.driverAge}>
                      <input value={form.driverAge} onChange={(event) => handleField("driverAge", event.target.value)} type="number" min="16" placeholder={t.placeholders.driverAge} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white placeholder:text-slate-500" />
                    </Field>
                    <Field label={t.labels.postalCode}>
                      <input value={form.postalCode} onChange={(event) => handleField("postalCode", event.target.value.toUpperCase())} placeholder={t.placeholders.postalCode} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white uppercase placeholder:text-slate-500" />
                    </Field>
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{t.lookupTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{lookupMessage}</p>
                  {postalLookup.label ? <p className="mt-2 text-xs leading-6 text-slate-500">{postalLookup.label}</p> : null}
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{t.sections.history}</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field label={t.labels.accidentCount}>
                      <select value={form.accidentCount} onChange={(event) => handleField("accidentCount", event.target.value)} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white">
                        {t.accidentOptions.map((option, index) => (
                          <option key={option} value={index === 2 ? "2" : String(index)}>{option}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={t.labels.ticketCount}>
                      <select value={form.ticketCount} onChange={(event) => handleField("ticketCount", event.target.value)} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white">
                        {t.ticketOptions.map((option, index) => (
                          <option key={option} value={index === 2 ? "2" : String(index)}>{option}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="mt-4 grid gap-4">
                    <Field label={t.labels.priorInsurance}>
                      <select value={form.priorInsurance} onChange={(event) => handleField("priorInsurance", event.target.value)} className="vault-input border-white/10 bg-[rgba(255,255,255,0.04)] text-white">
                        <option value="active">{t.priorInsuranceOptions[0]}</option>
                        <option value="inactive">{t.priorInsuranceOptions[1]}</option>
                        <option value="limited">{t.priorInsuranceOptions[2]}</option>
                      </select>
                    </Field>
                    <Field label={t.labels.historyNotes}>
                      <textarea value={form.historyNotes} onChange={(event) => handleField("historyNotes", event.target.value)} placeholder={t.placeholders.historyNotes} className="vault-input min-h-[120px] resize-y border-white/10 bg-[rgba(255,255,255,0.04)] py-4 text-white placeholder:text-slate-500" />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(255,255,255,0.05)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-7">
                <p className="vault-eyebrow text-[#cbd5e1]">{t.sections.estimate}</p>
                {estimate ? (
                  <div className="mt-5 grid gap-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{t.annualEstimate}</p>
                        <p className="mt-3 font-display text-4xl text-white">{formatCurrency.format(Math.round(estimate.annual))}</p>
                      </div>
                      <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{t.monthlyEstimate}</p>
                        <p className="mt-3 font-display text-4xl text-white">{formatCurrency.format(Math.round(estimate.monthly))}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.2rem] border border-white/8 bg-slate-950/40 p-4">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{t.factorAge}</p>
                        <p className="mt-2 text-base text-white">× {estimate.ageFactor.toFixed(2)}</p>
                      </div>
                      <div className="rounded-[1.2rem] border border-white/8 bg-slate-950/40 p-4">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{t.factorVehicle}</p>
                        <p className="mt-2 text-base text-white">× {estimate.vehicleFactor.toFixed(2)}</p>
                        <p className="mt-1 text-xs text-slate-500">{estimate.vehicleTier === "luxury" ? t.vehicleLuxury : estimate.vehicleTier === "standard" ? t.vehicleStandard : t.vehicleNeutral}</p>
                      </div>
                      <div className="rounded-[1.2rem] border border-white/8 bg-slate-950/40 p-4">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{t.factorClaims}</p>
                        <p className="mt-2 text-base text-white">× {estimate.claimsFactor.toFixed(2)}</p>
                      </div>
                      <div className="rounded-[1.2rem] border border-white/8 bg-slate-950/40 p-4">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{t.factorLocation}</p>
                        <p className="mt-2 text-base text-white">× {estimate.locationFactor.toFixed(2)}</p>
                        <p className="mt-1 text-xs text-slate-500">{estimate.isMontreal ? t.locationMontreal : t.locationOutside}</p>
                      </div>
                    </div>

                    {estimate.manualReview ? (
                      <div className="rounded-[1.4rem] border border-[#94a3b8]/30 bg-[#94a3b8]/10 p-5 text-sm leading-7 text-slate-200">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-100">{t.manualReview}</p>
                        <p className="mt-3">{t.manualReviewBody}</p>
                      </div>
                    ) : null}

                    {saveSuccess ? (
                      <div className="rounded-[1.4rem] border border-emerald-300/25 bg-emerald-400/10 p-5 text-sm leading-7 text-emerald-100">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5" />
                          <p>{t.success}</p>
                        </div>
                      </div>
                    ) : null}

                    <div className="grid gap-4 pt-2">
                      <Button onClick={handleSubmit} disabled={submitMutation.isPending} className="rounded-full bg-[linear-gradient(135deg,#f8fafc_0%,#cbd5e1_45%,#94a3b8_100%)] px-8 py-6 text-xs uppercase tracking-[0.26em] text-slate-950 hover:opacity-95 disabled:opacity-60">
                        {submitMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {submitMutation.isPending ? t.submitting : t.submit}
                      </Button>
                      <a href="#application-vault">
                        <Button variant="outline" className="w-full rounded-full border-white/16 bg-white/0 px-8 py-6 text-xs uppercase tracking-[0.26em] text-slate-100 hover:bg-white/8">
                          {t.applicationCta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-[1.4rem] border border-dashed border-white/12 bg-slate-950/40 p-6 text-sm leading-7 text-slate-400">
                    {t.summaryPrompt}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
