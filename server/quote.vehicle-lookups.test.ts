import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as dbModule from "./db";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("quote vehicle lookups", () => {
  it("maps MakeName responses into vehicle make options", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        Results: [
          { MakeName: "MERCEDES-BENZ" },
          { MakeName: "AUDI" },
          { MakeName: "AUDI" },
        ],
      }),
    } as Response);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.quote.getMakesByYear({ year: 2026 });

    expect(result).toEqual([
      { value: "AUDI", label: "AUDI" },
      { value: "MERCEDES-BENZ", label: "MERCEDES-BENZ" },
    ]);
  });

  it("maps Model_Name and ModelName responses into vehicle model options", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        Results: [
          { Model_Name: "GLE-Class" },
          { ModelName: "GLS-Class" },
          { Model_Name: "GLE-Class" },
        ],
      }),
    } as Response);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.quote.getModelsByYearMake({ year: 2026, make: "MERCEDES-BENZ" });

    expect(result).toEqual([
      { value: "GLE-Class", label: "GLE-Class" },
      { value: "GLS-Class", label: "GLS-Class" },
    ]);
  });

  it("submits a quote payload to the database helper and returns the created id", async () => {
    const createCarQuoteSubmission = vi.spyOn(dbModule, "createCarQuoteSubmission").mockResolvedValue({
      id: 42,
      locale: "fr",
      fullName: "Pablo Martinez",
      email: "pablo@example.com",
      phone: "514-555-0199",
      city: "Montréal",
      postalCode: "H1H1L5",
      validatedAddress: "Montréal-Nord, QC H1H 1L5",
      driverAge: 34,
      accidentCount: 0,
      ticketCount: 0,
      priorInsurance: "active",
      historyNotes: "Test submission",
      vehicleYear: 2026,
      vehicleMake: "MERCEDES-BENZ",
      vehicleModel: "GLE-Class",
      estimatedAnnualPremium: 1650,
      estimatedMonthlyPremium: 138,
      manualReview: 0,
      source: "website",
      createdAt: new Date(),
    } as Awaited<ReturnType<typeof dbModule.createCarQuoteSubmission>>);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.quote.submitCarQuote({
      locale: "fr",
      fullName: "Pablo Martinez",
      email: "pablo@example.com",
      phone: "514-555-0199",
      city: "Montréal",
      postalCode: "H1H1L5",
      validatedAddress: "Montréal-Nord, QC H1H 1L5",
      driverAge: 34,
      accidentCount: 0,
      ticketCount: 0,
      priorInsurance: "active",
      historyNotes: "Test submission",
      vehicleYear: 2026,
      vehicleMake: "MERCEDES-BENZ",
      vehicleModel: "GLE-Class",
      estimatedAnnualPremium: 1650,
      estimatedMonthlyPremium: 138,
      manualReview: false,
    });

    expect(createCarQuoteSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: "fr",
        fullName: "Pablo Martinez",
        email: "pablo@example.com",
        phone: "514-555-0199",
        postalCode: "H1H1L5",
        vehicleYear: 2026,
        vehicleMake: "MERCEDES-BENZ",
        vehicleModel: "GLE-Class",
        estimatedAnnualPremium: 1650,
        estimatedMonthlyPremium: 138,
        manualReview: 0,
        source: "website",
      }),
    );
    expect(result).toEqual({ success: true, submissionId: 42 });
  });
});
