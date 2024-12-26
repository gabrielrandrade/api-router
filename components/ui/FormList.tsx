import { PixelRatio, Text, View, ViewProps } from "react-native";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";

import * as AppleColors from "@bacons/apple-colors";
import { FormItem, HStack } from "./Form";
import { Link } from "expo-router";
const Colors = {
  systemGray4: AppleColors.systemGray4, // "rgba(209, 209, 214, 1)",
  secondarySystemGroupedBackground:
    AppleColors.secondarySystemGroupedBackground, // "rgba(255, 255, 255, 1)",
  separator: AppleColors.separator, // "rgba(61.2, 61.2, 66, 0.29)",
};

export const FormFont = {
  // From inspecting SwiftUI `List { Text("Foo") }` in Xcode.
  default: {
    color: AppleColors.label,
    // 17.00pt is the default font size for a Text in a List.
    fontSize: 17,
    // UICTFontTextStyleBody is the default fontFamily.
  },
  secondary: {
    color: AppleColors.secondaryLabel,
    fontSize: 17,
  },
  caption: {
    color: AppleColors.secondaryLabel,
    fontSize: 12,
  },
  title: {
    color: AppleColors.label,
    fontSize: 17,
    fontWeight: "600",
  },
};

export function FormList({
  children,
  title,
  footer,
  ...props
}: ViewProps & { title?: string; footer?: string | React.ReactNode }) {
  const childrenWithSeparator = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const isLastChild = index === React.Children.count(children) - 1;

      // Extract onPress from child
      const originalOnPress = child.props.onPress;
      let wrapsFormItem = false;
      // If child is type of Text, add default props
      if (child.type === Text) {
        child = React.cloneElement(child, {
          onPress: undefined,
          style: [FormFont.default, child.props.style],
          numberOfLines: 1,
          adjustsFontSizeToFit: true,
        });
      } else if (child.type === Link) {
        wrapsFormItem = true;

        let isTextOnly = true;
        const wrappedTextChildren = React.Children.map(
          child.props.children,
          (child) => {
            // Filter out empty children
            if (!child) {
              return null;
            }
            if (typeof child === "string") {
              return <Text style={FormFont.default}>{child}</Text>;
            }
            isTextOnly = false;
            return child;
          }
        );

        child = React.cloneElement(child, {
          style: [FormFont.default, child.props.style],
          numberOfLines: 1,
          adjustsFontSizeToFit: true,
          asChild: true,
          children: (
            <FormItem>
              <HStack>
                {wrappedTextChildren}
                <View style={{ flex: 1 }} />
                <LinkChevronIcon href={child.props.href} />
              </HStack>
            </FormItem>
          ),
          // children: isTextOnly ? (
          //   <FormItem>
          //     <HStack>
          //       {wrappedTextChildren}
          //       <View style={{ flex: 1 }} />
          //       <IconSymbol
          //         name="chevron.right"
          //         size={14}
          //         weight="bold"
          //         // from xcode, not sure which color is the exact match
          //         // #BFBFBF
          //         // #9D9DA0
          //         color={AppleColors.tertiaryLabel}
          //       />
          //     </HStack>
          //   </FormItem>
          // ) : (
          //   <FormItem>{wrappedTextChildren}</FormItem>
          // ),
        });
      }
      // Ensure child is a FormItem otherwise wrap it in a FormItem
      if (!wrapsFormItem && child.type !== FormItem) {
        child = <FormItem onPress={originalOnPress}>{child}</FormItem>;
      }

      return (
        <>
          {child}
          {!isLastChild && <Separator />}
        </>
      );
    }
    return child;
  });

  const contents = (
    <View
      {...props}
      style={[
        {
          borderCurve: "continuous",
          overflow: "hidden",
          borderRadius: 10,
          backgroundColor: Colors.secondarySystemGroupedBackground,
        },
        props.style,
      ]}
      children={childrenWithSeparator}
    />
  );

  return (
    <View>
      {title && (
        <Text
          style={{
            textTransform: "uppercase",
            color: AppleColors.secondaryLabel,
            paddingHorizontal: 20,
            paddingVertical: 8,
            fontSize: 14,
            // use Apple condensed font
            // fontVariant: ["small-caps"],
          }}
        >
          {title}
        </Text>
      )}
      {contents}
      {footer && (
        <Text
          style={{
            color: AppleColors.secondaryLabel,
            paddingHorizontal: 20,
            paddingVertical: 8,
            fontSize: 14,
          }}
        >
          {footer}
        </Text>
      )}
    </View>
  );
}

function LinkChevronIcon({ href }: { href?: any }) {
  const isHrefExternal =
    typeof href === "string" && /^([\w\d_+.-]+:)?\/\//.test(href);

  if (isHrefExternal) {
    return (
      <IconSymbol
        name="arrow.up.right"
        size={14}
        weight="bold"
        // from xcode, not sure which color is the exact match
        // #BFBFBF
        // #9D9DA0
        color={AppleColors.tertiaryLabel}
      />
    );
  }
  return (
    <IconSymbol
      name="chevron.right"
      size={14}
      weight="bold"
      // from xcode, not sure which color is the exact match
      // #BFBFBF
      // #9D9DA0
      color={AppleColors.tertiaryLabel}
    />
  );
}

function Separator() {
  return (
    <View
      style={{
        marginStart: 60,
        borderBottomWidth: 0.5, //StyleSheet.hairlineWidth,
        marginTop: -0.5, // -StyleSheet.hairlineWidth,
        borderBottomColor: Colors.separator,
      }}
    />
  );
}
