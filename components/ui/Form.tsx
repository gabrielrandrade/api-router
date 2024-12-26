import { TouchableHighlight, View, ViewProps, ViewStyle } from "react-native";

import React from "react";
import { Href, Link } from "expo-router";

import * as AppleColors from "@bacons/apple-colors";

const ListItemPaddingContext = React.createContext<
  | [
      // top, left, bottom, right
      number,
      number,
      number,
      number
    ]
  | undefined
>(undefined);

export function EnsurePadding({ children }: { children: React.ReactNode }) {
  const c = React.useContext(ListItemPaddingContext);
  if (!c) {
    const v = 11;
    const h = 20;
    const padding = [v, h, v, h] as const;
    return (
      <ListItemPaddingContext.Provider value={padding}>
        <View
          style={{
            paddingTop: padding[0],
            paddingLeft: padding[1],
            paddingBottom: padding[2],
            paddingRight: padding[3],
          }}
        >
          {children}
        </View>
      </ListItemPaddingContext.Provider>
    );
  }
  return <>{children}</>;
}

function mergedStyles(style: ViewStyle, props: ViewProps) {
  if (props.style == null) {
    return style;
  } else if (Array.isArray(props.style)) {
    return [style, ...props.style];
  } else {
    return [style, props.style];
  }
}

export function HStack(props: ViewProps) {
  return (
    <View
      {...props}
      style={mergedStyles(
        {
          flexDirection: "row",
          alignItems: "center",
        },
        props
      )}
    />
  );
}

const minItemHeight = 20;

import { forwardRef } from "react";

export const FormItem = forwardRef<
  typeof TouchableHighlight,
  Pick<ViewProps, "children"> & { href?: Href<any>; onPress?: () => void }
>(function FormItem({ children, href, onPress }, ref) {
  if (href == null) {
    if (onPress == null) {
      return (
        <EnsurePadding>
          <HStack style={{ minHeight: minItemHeight }}>{children}</HStack>
        </EnsurePadding>
      );
    }
    return (
      <TouchableHighlight
        ref={ref}
        underlayColor={AppleColors.systemGray4}
        onPress={onPress}
      >
        <EnsurePadding>
          <HStack style={{ minHeight: minItemHeight }}>{children}</HStack>
        </EnsurePadding>
      </TouchableHighlight>
    );
  }

  return (
    <Link asChild href={href} onPress={onPress}>
      <TouchableHighlight ref={ref} underlayColor={AppleColors.systemGray4}>
        <EnsurePadding>
          <HStack style={{ minHeight: minItemHeight }}>{children}</HStack>
        </EnsurePadding>
      </TouchableHighlight>
    </Link>
  );
});
