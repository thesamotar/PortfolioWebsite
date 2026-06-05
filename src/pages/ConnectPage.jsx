import { useCallback, useState } from "react";
import profileContent from "../data/profileContent";
import { BentoBox, ActionsSection, ConnectSection, SysStatusSection } from "../components/Bento";
import Toast from "../components/Toast";

/**
 * ConnectPage — Social links, quick actions, and system status.
 */
export default function ConnectPage() {
  const { identity, connect } = profileContent;
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = useCallback((msg) => {
    setToast({ message: msg, visible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleAction = useCallback(
    (action) => {
      if (action === "download-resume") {
        window.open(identity.resumeUrl, "_blank", "noopener,noreferrer");
      } else if (action === "copy-email") {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(identity.email)
            .then(() => showToast("Email copied to clipboard"))
            .catch(() => showToast("Copy failed — try manually"));
        } else {
          const ta = document.createElement("textarea");
          ta.value = identity.email;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
            showToast("Email copied to clipboard");
          } catch {
            showToast("Copy failed — try manually");
          }
          document.body.removeChild(ta);
        }
      }
    },
    [identity, showToast]
  );

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Connect</h1>
        <p className="page-header__sub">Let's talk — or just follow along.</p>
      </header>

      <div className="page-content page-content--connect">
        <BentoBox id="quick-actions" header="Quick Actions" size="full" accent="teal" className="actions-box">
          <ActionsSection actions={connect.actions} onAction={handleAction} />
        </BentoBox>

        <BentoBox id="social-nodes" header="Find Me" size="full" accent="teal">
          <ConnectSection nodes={connect.nodes} />
        </BentoBox>

        <BentoBox id="sys-status" header="System Status" size="full" accent="coral">
          <SysStatusSection status={connect.status} />
        </BentoBox>
      </div>

      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />
    </>
  );
}
