import {
  Spotlight,
  SpotlightActionData,
  SpotlightActionGroupData,
} from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { navbarLinksWithChildrens } from "../../constants";
import useTranslator from "@/hooks/useTranslator";
import { useNavigate } from "react-router-dom";

const SearchSpotlight = () => {
  const { t, language } = useTranslator();
  const navigate = useNavigate();

  const links = navbarLinksWithChildrens.map((section) => ({
    group: section.label?.[language],
    actions:
      section?.children?.map((link) => ({
        id: link.href.toString(),
        label: link.label?.[language],
        description: link.description?.[language],
        leftSection: link.Icon && (
          <link.Icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
        ),
        onClick: () => navigate(link.href),
      })) || [],
  }));

  const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
    ...links,
  ];

  return (
    <Spotlight
      actions={actions}
      nothingFound={t("searchSpotlightNothingFound")}
      shortcut={["/"]}
      limit={7}
      highlightQuery
      scrollable
      maxHeight={350}
      searchProps={{
        leftSection: (
          <IconSearch
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        ),
        placeholder: t("searchSpotlightPlaceholder"),
      }}
    />
  );
};

export default SearchSpotlight;
