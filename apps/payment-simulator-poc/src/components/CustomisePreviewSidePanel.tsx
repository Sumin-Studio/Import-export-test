"use client";

import * as React from "react";

import { XUIIconButton } from "@xero/xui/react/button";
import XUIFileUploader from "@xero/xui/react/fileuploader";
import XUISwitch from "@xero/xui/react/switch";
import {
  XUISingleSelect,
  XUISingleSelectLabel,
  XUISingleSelectOption,
  XUISingleSelectOptions,
  XUISingleSelectTrigger,
} from "@xero/xui/react/singleselect";
import XUITextInput from "@xero/xui/react/textinput";
import back from "@xero/xui-icon/icons/back";

import {
  DEFAULT_COMPANY_NAME,
  usePreviewSettings,
  type PreviewDocumentType,
  type PreviewSettings,
} from "@/context/PreviewSettingsContext";
import {
  getRegionConfig,
  isPaymentMethodAvailableInRegion,
} from "@/lib/regionConfig";

import styles from "./CustomisePreviewSidePanel.module.scss";

const REGIONS = [
  "United Kingdom",
  "Australia",
  "New Zealand",
  "United States",
  "Canada",
  "South Africa",
] as const;

type RegionName = (typeof REGIONS)[number];

function regionSlug(region: string): string {
  return region.toLowerCase().replace(/\s+/g, "-");
}

/** Stable id for `XUISingleSelectOption` / `defaultSelectedOptionId` */
function regionOptionId(region: RegionName): string {
  return `pspoc-preview-region-${regionSlug(region)}`;
}

const DOCUMENT_OPTIONS = [
  {
    id: "pspoc-doc-one-time",
    label: "One-time invoice",
    value: "one_time" as const,
  },
  {
    id: "pspoc-doc-recurring",
    label: "Repeating invoice",
    value: "recurring" as const,
  },
];

function documentOptionId(t: PreviewDocumentType): string {
  return t === "recurring" ? "pspoc-doc-recurring" : "pspoc-doc-one-time";
}

interface PaymentOptionSwitchProps {
  label: string;
  method: keyof import("@/context/PreviewSettingsContext").PaymentOptions;
  settings: import("@/context/PreviewSettingsContext").PreviewSettings;
  updatePaymentOption: (
    key: keyof import("@/context/PreviewSettingsContext").PaymentOptions,
    value: boolean
  ) => void;
}

function PaymentOptionSwitch({
  label,
  method,
  settings,
  updatePaymentOption,
}: PaymentOptionSwitchProps) {
  const available = isPaymentMethodAvailableInRegion(
    method,
    settings.region ?? "United Kingdom"
  );
  if (!available) return null;
  return (
    <XUISwitch
      isReversed
      isChecked={Boolean(settings.paymentOptions[method])}
      onChange={(e) => updatePaymentOption(method, e.target.checked)}
    >
      {label}
    </XUISwitch>
  );
}

/** Keeps `card`, `applePay`, and `googlePay` identical — both switches below use this. */
function setCardAndExpressWallets(
  prev: PreviewSettings["paymentOptions"],
  on: boolean,
): PreviewSettings["paymentOptions"] {
  return {
    ...prev,
    card: on,
    applePay: on,
    googlePay: on,
  };
}

function CardPaymentOptionSwitch({
  settings,
  updateSettings,
}: {
  settings: PreviewSettings;
  updateSettings: (updates: Partial<PreviewSettings>) => void;
}) {
  const available = isPaymentMethodAvailableInRegion(
    "card",
    settings.region ?? "United Kingdom",
  );
  if (!available) return null;
  const on = settings.paymentOptions.card;
  return (
    <XUISwitch
      isReversed
      isChecked={on}
      onChange={(e) => {
        const v = e.target.checked;
        updateSettings({
          paymentOptions: setCardAndExpressWallets(settings.paymentOptions, v),
        });
      }}
    >
      Card
    </XUISwitch>
  );
}

function ApplePayAndGooglePaySwitch({
  settings,
  updateSettings,
}: {
  settings: PreviewSettings;
  updateSettings: (updates: Partial<PreviewSettings>) => void;
}) {
  const region = settings.region ?? "United Kingdom";
  const available =
    isPaymentMethodAvailableInRegion("applePay", region) &&
    isPaymentMethodAvailableInRegion("googlePay", region);
  if (!available) return null;
  const on = settings.paymentOptions.card;
  return (
    <XUISwitch
      isReversed
      isChecked={on}
      onChange={(e) => {
        const v = e.target.checked;
        updateSettings({
          paymentOptions: setCardAndExpressWallets(settings.paymentOptions, v),
        });
      }}
    >
      Apple Pay and Google Pay
    </XUISwitch>
  );
}

function StaticSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.staticSection}${className ? ` ${className}` : ""}`}>
      <h3 className={styles.staticSectionHeading}>{title}</h3>
      <div className={styles.staticSectionBody}>{children}</div>
    </div>
  );
}

export interface CustomisePreviewSidePanelProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  panelBodyRef?: React.Ref<HTMLDivElement>;
  regionRef?: React.Ref<HTMLElement>;
}

export function CustomisePreviewSidePanel({
  isCollapsed = false,
  onToggleCollapse,
  panelBodyRef,
  regionRef,
}: CustomisePreviewSidePanelProps = {}) {
  const { settings, updateSettings, updatePaymentOption } = usePreviewSettings();

  const selectedRegion = React.useMemo((): RegionName => {
    const r = settings.region ?? "United Kingdom";
    return (REGIONS as readonly string[]).includes(r) ? (r as RegionName) : "United Kingdom";
  }, [settings.region]);

  const selectedDocumentType = React.useMemo((): PreviewDocumentType => {
    return settings.documentType === "recurring" ? "recurring" : "one_time";
  }, [settings.documentType]);

  const [fileList, setFileList] = React.useState<
    Array<{ uid: string; status: string; originalFile: File }>
  >([]);
  const prevLogoUrlRef = React.useRef<string | null>(null);

  const revokeLogoUrl = React.useCallback((url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }, []);

  const handleFilesChange = (
    newList: Array<{ uid: string; status: string; originalFile: File }>,
  ) => {
    const withStatus = newList.map((f) => ({
      ...f,
      status: "done" as const,
    }));
    setFileList(withStatus);

    revokeLogoUrl(prevLogoUrlRef.current);
    prevLogoUrlRef.current = null;

    if (withStatus.length > 0 && withStatus[0].originalFile) {
      const url = URL.createObjectURL(withStatus[0].originalFile);
      prevLogoUrlRef.current = url;
      updateSettings({ logoUrl: url });
    } else {
      updateSettings({ logoUrl: null });
    }
  };

  const handleDelete = (
    file: { uid: string; status: string; originalFile: File },
    list: Array<{ uid: string; status: string; originalFile: File }>,
  ) => {
    const remaining = list.filter((x) => x.uid !== file.uid);
    setFileList(remaining);
    revokeLogoUrl(settings.logoUrl);
    prevLogoUrlRef.current = null;
    updateSettings({ logoUrl: null });
  };

  const handleRegionSelect = React.useCallback(
    (optionId: string) => {
      const region =
        REGIONS.find((r) => regionOptionId(r) === optionId) ?? "United Kingdom";
      const regionConfig = getRegionConfig(region);
      updateSettings({
        region,
        paymentOptions: { ...regionConfig.defaultPaymentOptions },
      });
    },
    [updateSettings],
  );

  const handleDocumentTypeSelect = React.useCallback(
    (optionId: string) => {
      const opt = DOCUMENT_OPTIONS.find((o) => o.id === optionId);
      if (opt) updateSettings({ documentType: opt.value });
    },
    [updateSettings],
  );

  return (
    <aside
      className={`${styles.sidePanel} ${isCollapsed ? styles.sidePanelCollapsed : ""}`}
      aria-label="Customise preview settings"
    >
      <header className={styles.header}>
        <XUIIconButton
          size="small"
          icon={back}
          rotation={isCollapsed ? 180 : 0}
          ariaLabel={isCollapsed ? "Expand panel" : "Collapse panel"}
          onClick={onToggleCollapse}
        />
        {!isCollapsed && <h2 className={styles.title}>Customise preview</h2>}
      </header>

      {!isCollapsed && (
      <div ref={panelBodyRef} className={styles.scrollContent}>
        <StaticSection title="Add your company branding" className={styles.staticSectionBranding}>
          <div className={styles.brandingFields}>
            <XUITextInput
              size="medium"
              label="Your company name"
              value={settings.companyName}
              placeholder={DEFAULT_COMPANY_NAME}
              onChange={(e) =>
                updateSettings({ companyName: e.target.value })
              }
            />
            <XUIFileUploader
              acceptedFileExtensions="image/*,.svg,image/svg+xml"
              label="Add your logo"
              buttonText="Select file"
              dropZoneMessage="Drag and drop file(s) or select manually"
              fileList={fileList}
              hintMessage="25MB total file size limit"
              deleteLabel="Delete file"
              getDeleteLabel={(fileName) => `Delete file ${fileName}`}
              cancelButtonText="Cancel"
              defaultErrorMessage="Failed to upload file"
              errorIconAriaLabel="Error"
              retryButtonText="Retry"
              uploadingIconAriaLabel="Uploading"
              uploadingMessage="Uploading..."
              onFilesChange={handleFilesChange}
              onDelete={handleDelete}
              onRetry={(file, list) => {
                const updated = list.map((f) =>
                  f.uid === file.uid ? { ...f, status: "done" as const } : f,
                );
                setFileList(updated);
              }}
            />
          </div>
        </StaticSection>

        <StaticSection title="Payment options">
          <div className={styles.switchGroup}>
            <CardPaymentOptionSwitch
              settings={settings}
              updateSettings={updateSettings}
            />
            <ApplePayAndGooglePaySwitch
              settings={settings}
              updateSettings={updateSettings}
            />
            <PaymentOptionSwitch
              label="Pay by Bank"
              method="payByBank"
              settings={settings}
              updatePaymentOption={updatePaymentOption}
            />
            <PaymentOptionSwitch
              label="Direct Debit"
              method="directDebit"
              settings={settings}
              updatePaymentOption={updatePaymentOption}
            />
            <PaymentOptionSwitch
              label="Klarna"
              method="klarna"
              settings={settings}
              updatePaymentOption={updatePaymentOption}
            />
          </div>
        </StaticSection>

        <StaticSection title="Document type">
          <div className={styles.documentTypeSelect}>
            <XUISingleSelect
              defaultSelectedOptionId={documentOptionId(selectedDocumentType)}
              onSelect={handleDocumentTypeSelect}
              preferredFlyoutPosition="bottom-left"
            >
              <XUISingleSelectLabel className={styles.regionLabel}>
                Document type
              </XUISingleSelectLabel>
              <XUISingleSelectTrigger
                fullWidth="always"
                qaHook="pspoc-preview-document-type"
              />
              <XUISingleSelectOptions matchTriggerWidth>
                {DOCUMENT_OPTIONS.map((o) => (
                  <XUISingleSelectOption id={o.id} key={o.id}>
                    {o.label}
                  </XUISingleSelectOption>
                ))}
              </XUISingleSelectOptions>
            </XUISingleSelect>
          </div>
        </StaticSection>
      </div>
      )}

      {!isCollapsed && (
      <footer ref={regionRef} className={styles.footer}>
        <div className={styles.regionSingleSelect}>
          <XUISingleSelect
            defaultSelectedOptionId={regionOptionId(selectedRegion)}
            onSelect={handleRegionSelect}
            preferredFlyoutPosition="bottom-left"
          >
            <XUISingleSelectLabel className={styles.regionLabel}>
              Region
            </XUISingleSelectLabel>
            <XUISingleSelectTrigger fullWidth="always" qaHook="pspoc-preview-region" />
            <XUISingleSelectOptions matchTriggerWidth>
              {REGIONS.map((r) => (
                <XUISingleSelectOption id={regionOptionId(r)} key={r}>
                  {r}
                </XUISingleSelectOption>
              ))}
            </XUISingleSelectOptions>
          </XUISingleSelect>
        </div>
      </footer>
      )}
    </aside>
  );
}
