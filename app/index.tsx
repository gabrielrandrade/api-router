import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { StyleSheet, Text, View } from "react-native";

import * as AC from "@bacons/apple-colors";
import { FadeIn } from "@/components/ui/FadeIn";
import { ComponentProps, useState } from "react";
import TouchableBounce from "@/components/ui/TouchableBounce.native";
import Skeleton from "@/components/ui/Skeleton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { FormFont, FormList } from "@/components/ui/FormList";
import { FormItem, HStack } from "@/components/ui/Form";

export default function Page() {
  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >
      <FormList>
        {/* <FormItem>
        <View style={{ gap: 4 }}>
          <Text style={{ color: AC.label, fontSize: 18, fontWeight: "600" }}>
            Results
          </Text>
          <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
            {"No results yet"}
          </Text>
        </View>
      </FormItem> */}
        <Text>Default</Text>
        <Text
          onPress={() => {
            console.log("Hey");
          }}
        >
          Press
        </Text>
        <Text style={{ fontWeight: "bold", color: "blue" }}>Custom style</Text>

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

        {/* <Foo>Hey</Foo> */}
        {/* <FormItem>
        <View style={{ gap: 4 }}>
          <Text style={{ color: AC.label, fontSize: 18, fontWeight: "600" }}>
            Results
          </Text>
          <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
            {"No results yet"}
          </Text>
        </View>
      </FormItem> */}
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
      <Text
        style={{
          color: AC.label,
          fontSize: 17,
        }}
      >
        {children}
      </Text>
    </HStack>
  );
}

// List
// Link
// ol
// ul
// table -> two columns

function Foo(props) {
  return <Text {...props} />;
}
