import * as Form from "@/components/ui/Form";
import { IconSymbol } from "@/components/ui/IconSymbol";
import * as AC from "@bacons/apple-colors";
import { Image, View } from "react-native";

export default function Page() {
  return (
    <Form.List navigationTitle="Account">
      <Form.Section>
        <Form.HStack style={{ gap: 12 }}>
          <Image
            source={{ uri: "https://github.com/evanbacon.png" }}
            style={{
              aspectRatio: 1,
              height: 48,
              borderRadius: 999,
            }}
          />
          <View style={{ gap: 4 }}>
            <Form.Text style={Form.FormFont.default}>Evan's world</Form.Text>
            <Form.Text style={Form.FormFont.caption}>Today</Form.Text>
          </View>
        </Form.HStack>
        <Form.Link
          href="/gamecenter"
          hint="Baconator"
          systemImage={{ name: "gamecontroller.fill", color: AC.systemPink }}
        >
          Game Center
        </Form.Link>
      </Form.Section>

      <Form.Section>
        <Form.Link href="/apps">Apps</Form.Link>
        <Form.Link href="/subscriptions">Subscriptions</Form.Link>
        <Form.Link href="/purchase-history">Purchase History</Form.Link>
        <Form.Link href="/notifications">Notifications</Form.Link>
      </Form.Section>

      <Form.Section>
        <Form.Text style={{ color: AC.link }} onPress={() => {}}>
          Redeem Gift Card or Code
        </Form.Text>
        <Form.Text style={{ color: AC.link }} onPress={() => {}}>
          Send Gift Card by Email
        </Form.Text>
        <Form.Text style={{ color: AC.link }} onPress={() => {}}>
          Add Money to Account
        </Form.Text>
      </Form.Section>

      <Form.Section>
        <Form.Link href="/personalized">Personalized Recommendations</Form.Link>
      </Form.Section>

      <Form.Section title="Upcoming automatic updates">
        <Form.Text hint={"8"}>Update All</Form.Text>

        <AppUpdate />
        <AppUpdate />
        <AppUpdate />
      </Form.Section>
    </Form.List>
  );
}

function AppUpdate() {
  return (
    <View style={{ gap: 16, flex: 1 }}>
      <Form.HStack style={{ gap: 16 }}>
        <Image
          source={{ uri: "https://github.com/evanbacon.png" }}
          style={{
            aspectRatio: 1,
            height: 48,
            borderRadius: 12,
          }}
        />
        <View style={{ gap: 4 }}>
          <Form.Text style={Form.FormFont.default}>Evan's world</Form.Text>
          <Form.Text style={Form.FormFont.caption}>Today</Form.Text>
        </View>

        <View style={{ flex: 1 }} />

        <IconSymbol
          color={AC.systemBlue}
          name="person.fill.badge.plus"
          size={24}
        />
      </Form.HStack>
      <Form.Text>- Minor bug-fixes</Form.Text>
    </View>
  );
}
