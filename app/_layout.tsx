import ThemeProvider from "@/components/ui/ThemeProvider";
import { Tabs } from "expo-router";

import { IconSymbol } from "@/components/ui/IconSymbol";
import BlurTabBarBackground from "@/components/ui/TabBarBackground.ios";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: BlurTabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
          // tabBarActiveTintColor: AC.systemBlue as any,
        }}
      >
        <Tabs.Screen
          name="(index)"
          options={{
            title: "Home",
            tabBarIcon: (props) => <IconSymbol {...props} name="house.fill" />,
          }}
        />
        <Tabs.Screen
          name="(info)"
          options={{
            title: "Info",
            tabBarIcon: (props) => <IconSymbol {...props} name="brain.fill" />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}

function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
