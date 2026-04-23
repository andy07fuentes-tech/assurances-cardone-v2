import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type MockScript = {
  src?: string;
  async?: boolean;
  crossOrigin?: string;
  dataset: Record<string, string>;
  onload?: (() => void) | null;
  onerror?: (() => void) | null;
  addEventListener: ReturnType<typeof vi.fn>;
};

describe("loadMapScript", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("resolves immediately when Google Maps is already available", async () => {
    const appendChild = vi.fn();

    vi.stubGlobal("window", { google: { maps: {} } });
    vi.stubGlobal("document", {
      querySelector: vi.fn(),
      createElement: vi.fn(),
      head: { appendChild },
    });

    const { loadMapScript } = await import("@/components/Map");

    await expect(loadMapScript()).resolves.toBeUndefined();
    expect(appendChild).not.toHaveBeenCalled();
  });

  it("reuses a single pending script load when called multiple times", async () => {
    const scripts: MockScript[] = [];
    const appendChild = vi.fn((script: MockScript) => {
      scripts.push(script);
      script.onload?.();
      return script;
    });

    vi.stubGlobal("window", {});
    vi.stubGlobal("document", {
      querySelector: vi.fn(() => null),
      createElement: vi.fn(
        () =>
          ({
            dataset: {},
            addEventListener: vi.fn(),
            onload: null,
            onerror: null,
          }) satisfies MockScript,
      ),
      head: { appendChild },
    });

    const { loadMapScript } = await import("@/components/Map");

    await Promise.all([loadMapScript(), loadMapScript()]);

    expect(appendChild).toHaveBeenCalledTimes(1);
    expect(scripts).toHaveLength(1);
    expect(scripts[0].dataset.manusGoogleMaps).toBe("true");
    expect(scripts[0].src).toContain("/v1/maps/proxy/maps/api/js");
  });
});
