import { Tabs } from "@mantine/core";
import { Form } from "@/types/mantine";
import { UserForm } from "../../types";
import { ResourceUserDto } from "@/apis/core/User/types";
import useSearch from "@/hooks/useSearch";
import PoliciesTab from "./PoliciesTab";
import AccountTab from "./AccountTab";
import ContactsTab from "./ContactsTab";

interface Props {
  form: Form<UserForm>;
  selectedItem?: ResourceUserDto;
  isUploadingImage: boolean;
}

const FormTabs = ({ form, selectedItem, isUploadingImage }: Props) => {
  const tabs = [
    {
      value: "account",
      label: "Account",
      Panel: (
        <AccountTab
          form={form}
          selectedItem={selectedItem}
          isUploadingImage={isUploadingImage}
        />
      ),
    },
    {
      value: "contacts",
      label: "Contacts",
      Panel: <ContactsTab form={form} />,
    },
    {
      value: "policies",
      label: "Policies",
      tabProps: {
        disabled: true,
      },
      Panel: <PoliciesTab form={form} />,
    },
  ];

  const { searchParams, setParam } = useSearch();

  const activeTab = searchParams.get("activeTab") || tabs[0].value;

  const setActiveTab = (tab: string | null) => {
    setParam("activeTab", tab!);
  };

  return (
    <Tabs
      defaultValue="personalInformation"
      value={activeTab}
      onChange={setActiveTab}
    >
      <Tabs.List>
        {tabs.map((t) => (
          <Tabs.Tab key={t.value} size="md" value={t.value} {...t.tabProps}>
            {t.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((t) => (
        <Tabs.Panel key={t.value} value={t.value}>
          {t.Panel}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default FormTabs;
