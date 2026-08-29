import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  /**
   * Pin the workspace root. A stray, empty package-lock.json sits in the parent
   * projects directory, so Turbopack otherwise infers that directory as the root
   * and watches every sibling repo — which pegs the CPU and bloats .next to
   * hundreds of MB. Without this, `next dev` hangs before it serves a request.
   */
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
