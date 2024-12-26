import { TouchableHighlight, View, ViewProps } from "react-native";

import React from "react";
import { Href, Link } from "expo-router";

import * as AppleColors from "@bacons/apple-colors";

export function FormItem({
  children,
  href,
}: Pick<ViewProps, "children"> & { href?: Href<any> }) {
  if (href == null) {
    return (
      <View style={{ padding: 12, paddingLeft: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <Link asChild href={href}>
      <TouchableHighlight
        style={{ padding: 12, paddingLeft: 16 }}
        underlayColor={AppleColors.systemGray4}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {children}
        </View>
      </TouchableHighlight>
    </Link>
  );
}
