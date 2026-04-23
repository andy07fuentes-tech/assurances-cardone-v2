import { z } from "zod";
import { COOKIE_NAME } from "../shared/const";
import { createCarQuoteSubmission } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const vpicBaseUrl = "https://vpic.nhtsa.dot.gov/api/vehicles";

const vehicleOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const quoteSubmissionSchema = z.object({
  locale: z.enum(["fr", "en"]),
  fullName: z.string().min(2).max(160),
  email: z.string().email().max(320),
  phone: z.string().min(7).max(40),
  city: z.string().max(120).optional().default(""),
  postalCode: z.string().min(6).max(12),
  validatedAddress: z.string().max(500).optional(),
  driverAge: z.number().int().min(16).max(100),
  accidentCount: z.number().int().min(0).max(5),
  ticketCount: z.number().int().min(0).max(5),
  priorInsurance: z.enum(["active", "inactive", "limited"]),
  historyNotes: z.string().max(2000).optional().default(""),
  vehicleYear: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  vehicleMake: z.string().min(1).max(120),
  vehicleModel: z.string().min(1).max(160),
  estimatedAnnualPremium: z.number().int().min(0),
  estimatedMonthlyPremium: z.number().int().min(0),
  manualReview: z.boolean(),
});

async function readJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "AssurancesCardoneQuoteConnector/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Vehicle API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

type VpicResult = {
  Make_Name?: string;
  MakeName?: string;
  Model_Name?: string;
  ModelName?: string;
};

type VpicResponse = {
  Results?: VpicResult[];
};

function uniqueOptions(values: Array<string | undefined>) {
  const seen = new Set<string>();

  return values
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .filter((value) => {
      const normalized = value.toUpperCase();
      if (seen.has(normalized)) {
        return false;
      }
      seen.add(normalized);
      return true;
    })
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value, label: value }));
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  quote: router({
    getVehicleYears: publicProcedure.query(() => {
      const currentYear = new Date().getFullYear() + 1;
      return Array.from({ length: currentYear - 1989 }, (_, index) => String(currentYear - index));
    }),
    getMakesByYear: publicProcedure
      .input(
        z.object({
          year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
        }),
      )
      .output(z.array(vehicleOptionSchema))
      .query(async () => {
        const makesResponse = await readJson<VpicResponse>(`${vpicBaseUrl}/GetMakesForVehicleType/car?format=json`);
        return uniqueOptions(makesResponse.Results?.map((entry) => entry.Make_Name ?? entry.MakeName));
      }),
    getModelsByYearMake: publicProcedure
      .input(
        z.object({
          year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
          make: z.string().min(1).max(120),
        }),
      )
      .output(z.array(vehicleOptionSchema))
      .query(async ({ input }) => {
        const encodedMake = encodeURIComponent(input.make.trim());
        const modelsResponse = await readJson<VpicResponse>(
          `${vpicBaseUrl}/GetModelsForMakeYear/make/${encodedMake}/modelyear/${input.year}?format=json`,
        );
        return uniqueOptions(modelsResponse.Results?.map((entry) => entry.Model_Name ?? entry.ModelName));
      }),
    submitCarQuote: publicProcedure
      .input(quoteSubmissionSchema)
      .mutation(async ({ input }) => {
        const created = await createCarQuoteSubmission({
          locale: input.locale,
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          city: input.city || null,
          postalCode: input.postalCode,
          validatedAddress: input.validatedAddress ?? null,
          driverAge: input.driverAge,
          accidentCount: input.accidentCount,
          ticketCount: input.ticketCount,
          priorInsurance: input.priorInsurance,
          historyNotes: input.historyNotes || null,
          vehicleYear: input.vehicleYear,
          vehicleMake: input.vehicleMake,
          vehicleModel: input.vehicleModel,
          estimatedAnnualPremium: input.estimatedAnnualPremium,
          estimatedMonthlyPremium: input.estimatedMonthlyPremium,
          manualReview: input.manualReview ? 1 : 0,
          source: "website",
        });

        return {
          success: true as const,
          submissionId: created.id,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
