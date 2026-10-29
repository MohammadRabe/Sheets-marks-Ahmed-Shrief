const PHONE_NUMBER = "+201154631859";
const WHATSAPP_URL = "https://wa.me/201154631859";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.1 3.5 5.6 5c-.6.6-.8 1.5-.4 2.3 2.2 4.7 5.9 8.4 10.6 10.6.8.4 1.7.2 2.3-.4l1.5-1.5c.5-.5.5-1.3.1-1.8l-1.8-2.2c-.4-.5-1.1-.7-1.7-.4l-1.8.9c-1.6-.9-2.9-2.2-3.8-3.8l.9-1.8c.3-.6.1-1.3-.4-1.7L8.9 3.4c-.5-.4-1.3-.4-1.8.1Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.2 21.8l5.2-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 19.9Zm4.4-5.9c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.9-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.5.2-.4c.1-.1 0-.3 0-.4l-.6-1.5c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.7 2.6 4.1 3.6.6.3 1.1.4 1.5.6.6.2 1.1.2 1.5.1.5-.1 1.2-.5 1.3-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="footer-contact">
        <strong>م/كريم مدحت</strong>
        <a href={`tel:${PHONE_NUMBER}`} dir="ltr" aria-label="الاتصال بمستر كريم مدحت">
          <PhoneIcon />
          <span>+20 11 54631859</span>
        </a>
      </div>

      <p className="footer-copyright">Copyright © 2026</p>

      <a className="whatsapp-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
        <WhatsAppIcon />
        <span>تواصل عبر واتساب</span>
      </a>
    </footer>
  );
}
