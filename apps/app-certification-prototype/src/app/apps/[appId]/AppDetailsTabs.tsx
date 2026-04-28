"use client";

import { useState } from "react";
import type { MockApp } from "@/lib/mock/app";
import {
  Field,
  TextInput,
  Textarea,
  MultiSelect,
  RadioGroup,
  CheckboxGroup,
} from "@/components/form";
import { USE_CASES } from "@/lib/certification/schema";

type TabId = "app" | "customer" | "developer";

export default function AppDetailsTabs({ app }: { app: MockApp }) {
  const [tab, setTab] = useState<TabId>("app");

  return (
    <div className="rounded-lg border border-border-secondary bg-white">
      <div className="flex border-b border-border-secondary">
        <TabButton
          label="App information"
          active={tab === "app"}
          onClick={() => setTab("app")}
        />
        <TabButton
          label="Customer information"
          active={tab === "customer"}
          onClick={() => setTab("customer")}
        />
        <TabButton
          label="Developer information"
          active={tab === "developer"}
          onClick={() => setTab("developer")}
        />
      </div>
      <div className="p-6">
        {tab === "app" && <AppInformation app={app} />}
        {tab === "customer" && <CustomerInformation app={app} />}
        {tab === "developer" && <DeveloperInformation app={app} />}
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px px-6 py-3 text-[14px] font-bold transition-colors ${
        active
          ? "border-b-[3px] border-action-primary text-content-primary"
          : "border-b-[3px] border-transparent text-content-secondary hover:text-content-primary"
      }`}
    >
      {label}
    </button>
  );
}

function AppInformation({ app }: { app: MockApp }) {
  const [name, setName] = useState(app.name);
  const [description, setDescription] = useState(app.description);
  const [useCases, setUseCases] = useState<string[]>(app.useCases);
  const [privacyUrl, setPrivacyUrl] = useState(app.privacyUrl);
  const [termsUrl, setTermsUrl] = useState(app.termsUrl);

  return (
    <div className="flex max-w-[560px] flex-col gap-5">
      <Field label="App name" htmlFor="ad-app-name">
        <TextInput
          id="ad-app-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>
      <Field label="App ID">
        <ReadonlyValue value={app.appId} />
      </Field>
      <Field label="App creation date">
        <ReadonlyValue value={app.createdAt} />
      </Field>
      <Field label="App description" htmlFor="ad-description">
        <Textarea
          id="ad-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </Field>
      <Field label="What is this app used for?">
        <MultiSelect
          values={useCases}
          onChange={setUseCases}
          options={USE_CASES}
          placeholder="Select use case(s)"
        />
      </Field>
      <Field label="Privacy policy URL" htmlFor="ad-privacy-url" optional>
        <TextInput
          id="ad-privacy-url"
          type="url"
          value={privacyUrl}
          onChange={(e) => setPrivacyUrl(e.target.value)}
        />
      </Field>
      <Field
        label="Terms and conditions URL"
        htmlFor="ad-terms-url"
        optional
      >
        <TextInput
          id="ad-terms-url"
          type="url"
          value={termsUrl}
          onChange={(e) => setTermsUrl(e.target.value)}
        />
      </Field>
    </div>
  );
}

function CustomerInformation({ app }: { app: MockApp }) {
  const [customerType, setCustomerType] = useState<"internal" | "external">(
    app.customerType,
  );
  const [bizSmall, setBizSmall] = useState(app.customerSmallBusiness);
  const [bizAcc, setBizAcc] = useState(app.customerAccountant);
  const [regions, setRegions] = useState<string[]>(app.customerRegions);
  const [commercialise, setCommercialise] = useState<"yes" | "no">(
    app.commercialise,
  );

  return (
    <div className="flex max-w-[560px] flex-col gap-5">
      <Field label="Customer type">
        <RadioGroup
          name="customer-type"
          value={customerType}
          onChange={(v) => setCustomerType(v as "internal" | "external")}
          options={[
            { value: "internal", label: "Internal customers" },
            { value: "external", label: "External customers" },
          ]}
        />
      </Field>
      <Field label="Business type">
        <CheckboxGroup
          values={[
            ...(bizSmall ? ["small"] : []),
            ...(bizAcc ? ["accountant"] : []),
          ]}
          onChange={(vals) => {
            setBizSmall(vals.includes("small"));
            setBizAcc(vals.includes("accountant"));
          }}
          options={[
            { value: "small", label: "Small business" },
            { value: "accountant", label: "Accountant or bookkeeper" },
          ]}
        />
      </Field>
      <Field label="Where are they based?">
        <MultiSelect
          values={regions}
          onChange={setRegions}
          options={[
            "Australia",
            "New Zealand",
            "United Kingdom",
            "United States",
            "Canada",
            "Singapore",
            "South Africa",
          ].map((l) => ({ value: l, label: l }))}
          placeholder="Select countries"
        />
      </Field>
      <Field label="Do you intend to commercialise this app?">
        <RadioGroup
          name="commercialise"
          value={commercialise}
          onChange={(v) => setCommercialise(v as "yes" | "no")}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </Field>
    </div>
  );
}

function DeveloperInformation({ app }: { app: MockApp }) {
  const [devType, setDevType] = useState<"inhouse" | "external">(app.devType);
  const [devCompany, setDevCompany] = useState(app.devCompanyName ?? "");
  const [devRegions, setDevRegions] = useState<string[]>(app.devRegions);

  return (
    <div className="flex max-w-[560px] flex-col gap-5">
      <Field label="Developer type">
        <RadioGroup
          name="dev-type"
          value={devType}
          onChange={(v) => setDevType(v as "inhouse" | "external")}
          options={[
            { value: "inhouse", label: "Internal developers" },
            { value: "external", label: "External developers" },
          ]}
        />
      </Field>
      {devType === "external" && (
        <Field label="Developer company name" htmlFor="ad-dev-company">
          <TextInput
            id="ad-dev-company"
            value={devCompany}
            onChange={(e) => setDevCompany(e.target.value)}
          />
        </Field>
      )}
      <Field label="Where is the developer based?">
        <MultiSelect
          values={devRegions}
          onChange={setDevRegions}
          options={[
            "Australia",
            "New Zealand",
            "United Kingdom",
            "United States",
            "Canada",
            "Singapore",
            "South Africa",
          ].map((l) => ({ value: l, label: l }))}
          placeholder="Select countries"
        />
      </Field>
    </div>
  );
}

function ReadonlyValue({ value }: { value: string }) {
  return (
    <div className="flex h-10 items-center justify-between rounded bg-background-tertiary/50 px-3 text-[14px] text-content-secondary">
      <span className="truncate">{value}</span>
      <button
        onClick={() => navigator.clipboard?.writeText(value)}
        className="ml-2 rounded px-2 py-1 text-[12px] font-bold text-action-primary hover:bg-action-tertiary"
      >
        Copy
      </button>
    </div>
  );
}
