import {
  PixelRatio,
  Text as RNText,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { Href } from "expo-router";

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

import * as AppleColors from "@bacons/apple-colors";
import { LinkProps, Link as RouterLink } from "expo-router";
const Colors = {
  systemGray4: AppleColors.systemGray4, // "rgba(209, 209, 214, 1)",
  secondarySystemGroupedBackground:
    AppleColors.secondarySystemGroupedBackground, // "rgba(255, 255, 255, 1)",
  separator: AppleColors.separator, // "rgba(61.2, 61.2, 66, 0.29)",
};

/** Text but with iOS default color and sizes. */
export const Text = React.forwardRef<
  RNText,
  TextProps & {
    /** Value displayed on the right side of the form item. */
    hint?: React.ReactNode;
  }
>((props, ref) => {
  return (
    <RNText
      dynamicTypeRamp="body"
      {...props}
      ref={ref}
      style={mergedStyles(FormFont.default, props)}
    />
  );
});

export const Link = React.forwardRef<
  typeof RouterLink,
  LinkProps & {
    /** Value displayed on the right side of the form item. */
    hint?: React.ReactNode;
  }
>((props, ref) => {
  return (
    <RouterLink
      dynamicTypeRamp="body"
      {...props}
      ref={ref}
      style={mergedStyles(FormFont.default, props)}
    />
  );
});

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

export function Section({
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
      if (child.type === RNText || child.type === Text) {
        child = React.cloneElement(child, {
          dynamicTypeRamp: "body",
          onPress: undefined,
          style: [FormFont.default, child.props.style],
          numberOfLines: 1,
          adjustsFontSizeToFit: true,
        });

        const hintView = (() => {
          if (!child.props.hint) {
            return null;
          }

          return React.Children.map(child.props.hint, (child) => {
            // Filter out empty children
            if (!child) {
              return null;
            }
            if (typeof child === "string") {
              return (
                <RNText dynamicTypeRamp="body" style={FormFont.secondary}>
                  {child}
                </RNText>
              );
            }
            return child;
          });
        })();

        if (hintView) {
          child = (
            <HStack>
              {child}
              <View style={{ flex: 1 }} />
              {hintView}
            </HStack>
          );
        }
      } else if (child.type === RouterLink || child.type === Link) {
        wrapsFormItem = true;

        const wrappedTextChildren = React.Children.map(
          child.props.children,
          (linkChild) => {
            // Filter out empty children
            if (!linkChild) {
              return null;
            }
            if (typeof linkChild === "string") {
              return (
                <RNText
                  dynamicTypeRamp="body"
                  style={mergedStyles(FormFont.default, child.props)}
                >
                  {linkChild}
                </RNText>
              );
            }
            return linkChild;
          }
        );

        const hintView = (() => {
          if (!child.props.hint) {
            return null;
          }

          return React.Children.map(child.props.hint, (child) => {
            // Filter out empty children
            if (!child) {
              return null;
            }
            if (typeof child === "string") {
              return <Text style={FormFont.secondary}>{child}</Text>;
            }
            return child;
          });
        })();

        child = React.cloneElement(child, {
          style: [FormFont.default, child.props.style],
          dynamicTypeRamp: "body",
          numberOfLines: 1,
          adjustsFontSizeToFit: true,
          asChild: true,
          children: (
            <FormItem>
              <HStack>
                {wrappedTextChildren}
                <View style={{ flex: 1 }} />
                {hintView}
                <View style={{ paddingLeft: 12 }}>
                  <LinkChevronIcon href={child.props.href} />
                </View>
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
        <RNText
          dynamicTypeRamp="footnote"
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
        </RNText>
      )}
      {contents}
      {footer && (
        <RNText
          dynamicTypeRamp="footnote"
          style={{
            color: AppleColors.secondaryLabel,
            paddingHorizontal: 20,
            paddingVertical: 8,
            fontSize: 14,
          }}
        >
          {footer}
        </RNText>
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

function mergedStyles(style: ViewStyle | TextStyle, props: any) {
  if (props.style == null) {
    return style;
  } else if (Array.isArray(props.style)) {
    return [style, ...props.style];
  } else {
    return [style, props.style];
  }
}
