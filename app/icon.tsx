import Stack from "@/components/ui/Stack";
import TouchableBounce from "@/components/ui/TouchableBounce";
import * as AC from "@bacons/apple-colors";
import { Image, ScrollView, useColorScheme, View } from "react-native";

const backgroundImage =
  process.env.EXPO_OS === "web"
    ? `backgroundImage`
    : `experimental_backgroundImage`;

import MaskedView from "@react-native-masked-view/masked-view";

export default function Page() {
  const icons = [
    "https://github.com/expo.png",
    "https://github.com/apple.png",
    "https://github.com/facebook.png",
    "https://github.com/evanbacon.png",
    "https://github.com/kitten.png",
  ];
  return (
    <>
      <Stack.Screen options={{ title: "App Icon" }} />
      <ScrollView horizontal contentContainerStyle={{ padding: 24, gap: 32 }}>
        {icons.map((icon) => (
          <TouchableBounce key={icon} onPress={() => {}}>
            <View
              style={{
                borderCurve: "continuous",
                overflow: "hidden",
                borderRadius: 20,
                boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                source={{ uri: icon }}
                style={{
                  aspectRatio: 1,
                  width: 72,
                }}
              />
            </View>

            <MaskedView
              style={{
                transform: [{ translateY: 12 }],
              }}
              maskElement={
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                    [backgroundImage]: `linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%)`,
                  }}
                />
              }
            >
              <Image
                source={{ uri: icon }}
                style={{
                  borderRadius: 20,
                  aspectRatio: 1,
                  transform: [{ scaleY: -1 }],
                  width: 72,
                  // TODO: Not supported on iOS yet
                  filter: [{ blur: 10 }],
                }}
              />
            </MaskedView>
          </TouchableBounce>
        ))}
      </ScrollView>
      <SideGradient />
      <SideGradient right />
    </>
  );
}

function SideGradient({ right }: { right?: boolean }) {
  const isDark = useColorScheme() === "dark";
  return (
    <View
      style={{
        width: 20,
        position: "absolute",
        top: 0,
        bottom: 0,
        ...(right ? { right: 0 } : { left: 0 }),
        [backgroundImage]: [
          {
            type: "linearGradient",
            direction: `to ${right ? "left" : "right"}`,
            colorStops: [
              { color: AC.secondarySystemBackground, positions: ["0%"] },
              {
                color: isDark
                  ? "rgba(28.05, 28.05, 30.6, 0)"
                  : "rgba(242.25, 242.25, 247.35, 0)",
                positions: ["100%"],
              },
            ],
          },
        ],
      }}
    />
  );
}
