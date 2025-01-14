import Stack from "@/components/ui/Stack";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";

import * as Form from "@/components/ui/Form";
import { IconSymbol } from "@/components/ui/IconSymbol";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerRight: () => (
              <Form.Link headerRight href="/account">
                <Avatar />
              </Form.Link>
            ),
          }}
        />
        <Stack.Screen
          name="icon"
          sheet
          options={{
            // Quarter sheet with no pulling allowed
            headerTransparent: false,
            sheetGrabberVisible: false,
            sheetAllowedDetents: [0.25],
            headerRight: () => (
              <Form.Link headerRight href="/" dismissTo>
                <IconSymbol
                  name="xmark.circle.fill"
                  color={AC.systemGray}
                  size={28}
                />
              </Form.Link>
            ),
          }}
        />
        <Stack.Screen name="info" sheet />
        <Stack.Screen
          name="account"
          options={{
            presentation: "modal",

            headerRight: () => (
              <Form.Link headerRight bold href="/" dismissTo>
                Done
              </Form.Link>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

function Avatar() {
  return (
    <View
      style={{
        padding: 6,
        borderRadius: 99,
        [process.env.EXPO_OS === "web"
          ? `backgroundImage`
          : `experimental_backgroundImage`]: `linear-gradient(to bottom, #A5ABB8, #858994)`,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontFamily: "ui-rounded",
          fontSize: 14,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        EB
      </Text>
    </View>
  );
}
