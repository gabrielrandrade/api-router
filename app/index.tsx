import React from "react";

import * as Form from "@/components/ui/Form";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  Segments,
  SegmentsList,
  SegmentsContent,
  SegmentsTrigger,
} from "@/components/ui/Segments";
import * as AC from "@bacons/apple-colors";
import { Link } from "expo-router";
import { ComponentProps } from "react";
import {
  Button,
  Image,
  OpaqueColorValue,
  Switch,
  Text,
  View,
} from "react-native";
import { ContentUnavailable } from "@/components/ui/ContentUnavailable";

function Switches() {
  const [on, setOn] = React.useState(false);

  return (
    <Form.Section title="Toggle">
      <Form.HStack>
        <Form.Text>Manual</Form.Text>
        <View style={{ flex: 1 }} />
        <Switch value={on} onValueChange={setOn} />
      </Form.HStack>
      <Form.Text bold hint={<Switch value={on} onValueChange={setOn} />}>
        Hint
      </Form.Text>
      <Form.Text
        systemImage={"light.beacon.min"}
        hint={<Switch value={on} onValueChange={setOn} />}
      >
        System Image
      </Form.Text>
    </Form.Section>
  );
}

export default function Page() {
  return (
    <View style={{ flex: 1, maxWidth: 650, marginHorizontal: "auto" }}>
      <Form.List navigationTitle="Settings">
        <Form.Section>
          <View style={{ alignItems: "center", gap: 8, padding: 16, flex: 1 }}>
            <Image
              source={{ uri: "https://github.com/evanbacon.png" }}
              style={{
                aspectRatio: 1,
                height: 64,
                borderRadius: 8,
              }}
            />
            <Form.Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Bacon Components
            </Form.Text>
            <Form.Text style={{ textAlign: "center", fontSize: 14 }}>
              Copy/paste components for universal Expo Router apps.{" "}
              <Form.Link
                style={{
                  color: AC.link,
                  fontSize: 14,
                }}
                href="/info"
              >
                Learn more...
              </Form.Link>
            </Form.Text>
          </View>
        </Form.Section>

        <Form.Section title="Features">
          <Form.Link href="/icon">Icon</Form.Link>
        </Form.Section>

        <Switches />

        <Form.Section
          title="Segments"
          footer="Render tabbed content declaratively"
        >
          <SegmentsTest />
        </Form.Section>

        <Form.Section>
          <Form.HStack style={{ gap: 16 }}>
            <Image
              source={{ uri: "https://github.com/evanbacon.png" }}
              style={{
                aspectRatio: 1,
                height: 48,
                borderRadius: 999,
              }}
            />
            <View style={{ gap: 4 }}>
              <Form.Text style={Form.FormFont.default}>Evan's iPhone</Form.Text>
              <Form.Text style={Form.FormFont.caption}>
                This iPhone 16 Pro Max
              </Form.Text>
            </View>

            <View style={{ flex: 1 }} />

            <IconSymbol
              color={AC.systemBlue}
              name="person.fill.badge.plus"
              size={24}
              animationSpec={{
                effect: {
                  type: "pulse",
                },
                repeating: true,
              }}
            />
          </Form.HStack>
        </Form.Section>

        <Form.Section
          title="Links"
          footer={
            <Text>
              Help improve Search by allowing Apple to store the searches you
              enter into Safari, Siri, and Spotlight in a way that is not linked
              to you.{"\n\n"}Searches include lookups of general knowledge, and
              requests to do things like play music and get directions.{"\n"}
              <Link style={{ color: AC.link }} href="/two">
                About Search & Privacy...
              </Link>
            </Text>
          }
        >
          {/* Table style: | A   B |*/}
          <Link href="/two">Next</Link>

          <Form.Link target="_blank" href="https://evanbacon.dev">
            Target _blank
          </Form.Link>

          <Link href="/two">
            <View style={{ gap: 4 }}>
              <Form.Text>Evan's iPhone</Form.Text>
              <Text style={Form.FormFont.caption}>This iPhone 16 Pro Max</Text>
            </View>
          </Link>

          <Link href="https://expo.dev">Expo</Link>

          <Form.Link href="/two" hint="Normal">
            Hint + Link
          </Form.Link>
        </Form.Section>

        <Form.Section title="Icons">
          <Form.Link href="/two" systemImage="star">
            Link + Icon
          </Form.Link>
          <Form.Link
            href="/two"
            systemImage={{ name: "car.fill", color: AC.systemPurple }}
          >
            Custom color in link
          </Form.Link>
          <Form.Text systemImage="airpodspro.chargingcase.wireless.fill">
            Item
          </Form.Text>
          <FormLabel
            onPress={() => {
              console.log("hey");
            }}
            systemImage="photo.on.rectangle"
          >
            Custom Icon
          </FormLabel>
          <Form.Link
            style={{
              color: AC.systemGreen,
            }}
            href="/two"
            systemImage="photo.on.rectangle"
          >
            Icon inherits link color
          </Form.Link>
        </Form.Section>

        <Form.Section title="Unavailable">
          <ContentUnavailable internet actions={<Button title="Refresh" />} />

          <ContentUnavailable search />
          <ContentUnavailable search="123" />
          <ContentUnavailable
            title="No content"
            systemImage="car"
            description="Could not find"
          />

          <ContentUnavailable
            title="Custom Unavailable"
            systemImage={
              <IconSymbol name="0.square" size={45} color={AC.systemPink} />
            }
          />
        </Form.Section>

        <Form.Section title="Form Items">
          <Text>Default</Text>
          <Form.Text hint="Right">Hint</Form.Text>
          <Text
            onPress={() => {
              console.log("Hey");
            }}
          >
            Pressable
          </Text>

          <Text style={{ fontWeight: "bold", color: AC.systemPink }}>
            Custom style
          </Text>
          <Form.Text bold>Bold</Form.Text>

          <View>
            <Text>Wrapped</Text>
          </View>

          {/* Table style: | A   B |*/}
          <Form.HStack>
            <Text style={Form.FormFont.default}>Foo</Text>
            <View style={{ flex: 1 }} />
            <Text style={Form.FormFont.secondary}>Bar</Text>
          </Form.HStack>
        </Form.Section>

        <Form.Section title="Table">
          {/* Table style: | A   B |*/}
          <Form.Text hint="Expo Router v4">SDK 52</Form.Text>

          {/* Custom version of same code */}
          <Form.HStack>
            <Text style={Form.FormFont.default}>SDK 51</Text>
            <View style={{ flex: 1 }} />
            <Text style={Form.FormFont.secondary}>Expo Router v3</Text>
          </Form.HStack>
        </Form.Section>
      </Form.List>
    </View>
  );
}

function FormLabel({
  children,
  systemImage,
  color,
}: {
  /** Only used when `<FormLabel />` is a direct child of `<Section />`. */
  onPress?: () => void;
  children: React.ReactNode;
  systemImage: ComponentProps<typeof IconSymbol>["name"];
  color?: OpaqueColorValue;
}) {
  return (
    <Form.HStack style={{ gap: 16 }}>
      <IconSymbol name={systemImage} size={28} color={color ?? AC.systemBlue} />
      <Text style={Form.FormFont.default}>{children}</Text>
    </Form.HStack>
  );
}

// List
// Link
// ol
// ul
// table -> two columns

function SegmentsTest() {
  return (
    <View style={{ flex: 1 }}>
      <Segments defaultValue="account">
        <SegmentsList>
          <SegmentsTrigger value="account">Account</SegmentsTrigger>
          <SegmentsTrigger value="password">Password</SegmentsTrigger>
        </SegmentsList>

        <SegmentsContent value="account">
          <Form.List style={{ backgroundColor: "transparent" }}>
            <Form.Section>
              <Text>Account Section</Text>
            </Form.Section>
          </Form.List>
        </SegmentsContent>
        <SegmentsContent value="password">
          <Form.List style={{ backgroundColor: "transparent" }}>
            <Form.Section>
              <Text>Password Section</Text>
            </Form.Section>
          </Form.List>
        </SegmentsContent>
      </Segments>
    </View>
  );
}
