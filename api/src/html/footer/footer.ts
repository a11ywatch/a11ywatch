import { config } from "@app/config";

interface MarketingFooterParams {
  userId: number;
  domain: string;
}

interface Footer {
  marketing(params: MarketingFooterParams): string;
}

const footer: Footer = {
  marketing: ({
    userId,
    domain,
  }) => `<footer style="margin-top:30px; padding: 6px;">
<a href="${config.ROOT_URL}/api/unsubscribe-emails?id=${userId}&domain=${domain}" target="_blank" style="font-size:12px">Unsubscribe</a>
<div style="margin-top:30px; font-weight: 100; text-align: center;">Powered by A11yWatch, LLC</div>
</footer>`,
};

export { footer };
