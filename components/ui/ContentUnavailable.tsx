// Similar to https://developer.apple.com/documentation/swiftui/contentunavailableview

import { View, Text } from "react-native";
import { IconSymbol, IconSymbolName } from "./IconSymbol";
import * as AC from "@bacons/apple-colors";

export function ContentUnavailable({
  title,
  description,
  systemImage,
  actions,
  ...props
}:
  | {
      title: string;
      description?: string;
      systemImage: IconSymbolName | (React.ReactElement & {});
      actions?: React.ReactNode;
    }
  | {
      search: boolean | string;
      description?: string;
      title?: string;
      systemImage?: IconSymbolName | (React.ReactElement & {});
      actions?: React.ReactNode;
    }) {
  let resolvedTitle = title;
  let resolvedSystemImage = systemImage;
  let resolvedDescription = description;
  if ("search" in props && props.search) {
    resolvedTitle =
      title ?? typeof props.search === "string"
        ? `No Results for "${props.search}"`
        : `No Results`;
    resolvedSystemImage ??= "magnifyingglass";
    resolvedDescription ??= `Check the spelling or try a new search.`;
  }

  return (
    <View
      style={{
        flex: 1,
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {typeof resolvedSystemImage === "string" ? (
        <IconSymbol
          name={resolvedSystemImage as any}
          size={48}
          color={AC.systemGray}
        />
      ) : (
        resolvedSystemImage
      )}
      <Text
        dynamicTypeRamp="title1"
        style={{ color: AC.label, fontWeight: "bold", fontSize: 16 }}
      >
        {resolvedTitle}
      </Text>
      {resolvedDescription && (
        <Text dynamicTypeRamp="body" style={{ color: AC.secondaryLabel }}>
          {resolvedDescription}
        </Text>
      )}
      {actions}
    </View>
  );
}
