import Stack from "@/components/ui/Stack";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { Text, View } from "react-native";

import * as Form from "@/components/ui/Form";

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
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen name="info" sheet />
        <Stack.Screen
          name="account"
          options={{
            presentation: "formSheet",
            gestureDirection: "vertical",
            animation: "slide_from_bottom",
            sheetGrabberVisible: true,
            sheetInitialDetentIndex: 0,
            sheetAllowedDetents: [0.5, 1.0],

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
