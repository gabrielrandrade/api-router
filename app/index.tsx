import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Image, StyleSheet, Text, View } from "react-native";

import * as AC from "@bacons/apple-colors";
import { FadeIn } from "@/components/ui/FadeIn";
import { ComponentProps, useState } from "react";
import TouchableBounce from "@/components/ui/TouchableBounce.native";
import Skeleton from "@/components/ui/Skeleton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { FormFont, FormList } from "@/components/ui/FormList";
import { FormItem, HStack } from "@/components/ui/Form";
import { Link } from "expo-router";

export default function Page() {
  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 24,
      }}
    >
      <FormList>
        <View style={{ alignItems: "center", gap: 8, padding: 16 }}>
          <Image
            source={{ uri: "https://github.com/evanbacon.png" }}
            style={{
              aspectRatio: 1,
              height: 64,
              borderRadius: 8,
            }}
          />
          <Text
            style={{
              color: AC.label,
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Web Inspector
          </Text>
          <Text style={{ textAlign: "center" }}>
            Web development tool for iOS and iPadOS.{" "}
            <Link
              style={{
                color: AC.link,
              }}
              href="/two"
            >
              Learn more...
            </Link>
          </Text>
        </View>
      </FormList>

      <FormList>
        <Link
          style={{
            color: AC.link,
          }}
          href="/two"
        >
          Setup Instructions
        </Link>
      </FormList>

      <FormList>
        <HStack>
          <Text style={FormFont.default}>Version</Text>
          <View style={{ flex: 1 }} />
          <Text style={FormFont.secondary}>1.2.7</Text>
        </HStack>

        <Text hint="iOS 18.3">System</Text>
      </FormList>

      <FormList>
        <Link href="https://evanbacon.dev">Evan Bacon</Link>
      </FormList>
      <FormList>
        <Link href="/credit">Acknowledgements</Link>
      </FormList>

      <FormList
        title="Vision"
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
        <Text>Default</Text>
        <Text hint="Right">Hint</Text>
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

        <View>
          <Text>Wrapped</Text>
        </View>

        <FormLabel
          onPress={() => {
            console.log("hey");
          }}
          systemImage="photo.on.rectangle"
        >
          Select multiple
        </FormLabel>

        {/* Table style: | A   B |*/}
        <HStack>
          <Text style={FormFont.default}>Foo</Text>
          <View style={{ flex: 1 }} />
          <Text style={FormFont.secondary}>Bar</Text>
        </HStack>
      </FormList>
      <FormList title="Links">
        {/* Table style: | A   B |*/}
        <Link href="/two">Next</Link>
        <Link href="/two">
          <View style={{ gap: 4 }}>
            <Text style={FormFont.default}>Evan's iPhone</Text>
            <Text style={FormFont.caption}>This iPhone 16 Pro Max</Text>
          </View>
        </Link>
        <Link href="https://expo.dev">Expo</Link>

        <Link href="/two">
          <FormLabel systemImage="photo.on.rectangle">
            Select multiple
          </FormLabel>
        </Link>
        <Link href="/two" hint={"Normal"}>
          Pick a value
        </Link>
      </FormList>

      <FormList>
        {/* Table style: | A   B |*/}
        <HStack>
          <Text style={FormFont.default}>SDK 52</Text>
          <View style={{ flex: 1 }} />
          <Text style={FormFont.secondary}>Expo Router v4</Text>
        </HStack>
        <HStack>
          <Text style={FormFont.default}>SDK 51</Text>
          <View style={{ flex: 1 }} />
          <Text style={FormFont.secondary}>Expo Router v3</Text>
        </HStack>
      </FormList>
    </BodyScrollView>
  );
}

function FormLabel({
  children,
  systemImage,
}: {
  /** Only used when `<FormLabel />` is a direct child of `<FormList />`. */
  onPress?: () => void;
  children: React.ReactNode;
  systemImage: ComponentProps<typeof IconSymbol>["name"];
}) {
  return (
    <HStack style={{ gap: 16 }}>
      <IconSymbol name={systemImage} size={28} color={AC.systemBlue} />
      <Text style={FormFont.default}>{children}</Text>
    </HStack>
  );
}

// List
// Link
// ol
// ul
// table -> two columns
