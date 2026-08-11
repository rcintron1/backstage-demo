export interface Config {
  /** Snyk plugin settings (must be frontend-visible for mocked demo mode). */
  snyk?: {
    /**
     * Use built-in mock vulnerability data instead of calling the Snyk API.
     * @visibility frontend
     */
    mocked?: boolean;
    /**
     * Snyk app hostname used for deep links.
     * @visibility frontend
     */
    appHost?: string;
    /**
     * Include resolved issues in severity graphs.
     * @visibility frontend
     */
    showResolvedInGraphs?: boolean;
  };
}
