import Stack from "@/components/ui/Stack";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { Button, Text } from "react-native";

import * as AC from "@bacons/apple-colors";

import * as Form from "@/components/ui/Form";
import { HeaderButton } from "@/components/ui/Header";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          title: "🥓 Bacon",
          headerRight: ({ tintColor }) => (
            <>
              <Form.Link headerRight href="/two">
                Hey
              </Form.Link>
              <Form.Link headerRight style={{ color: tintColor }} href="/two">
                Hey
              </Form.Link>
            </>
          ),
          // headerRight: ({ tintColor }) => (
          //   <>
          //     <Form.Link headerRight href="/two">
          //       Hey
          //     </Form.Link>
          //     <Form.Link
          //       headerRight
          //       style={{ color: AC.systemPink }}
          //       href="/two"
          //     >
          //       Hey
          //     </Form.Link>
          //   </>
          // ),
        }}
      />
    </ThemeProvider>
  );
}
