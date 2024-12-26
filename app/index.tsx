import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { StyleSheet, Text, View } from "react-native";

import * as AC from "@bacons/apple-colors";
import { FadeIn } from "@/components/ui/FadeIn";
import { useState } from "react";
import TouchableBounce from "@/components/ui/TouchableBounce.native";
import Skeleton from "@/components/ui/Skeleton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { FormList } from "@/components/ui/FormList";
import { FormItem } from "@/components/ui/Form";

export default function Page() {
  return (
    <BodyScrollView>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Hello World</Text>
          <Text style={styles.subtitle}>
            This is the first page of your app.
          </Text>

          <FadeInTest />

          <TouchableBounce>
            <Text>TouchableBounce</Text>
          </TouchableBounce>

          <Skeleton />

          <Skeleton dark />

          <IconSymbol name="star.bubble.fill" color={AC.systemCyan} />
        </View>
      </View>

      <FormScroll />
    </BodyScrollView>
  );
}

function FormScroll() {
  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >
      <FormList>
        <FormItem>
          <View style={{ gap: 4 }}>
            <Text style={{ color: AC.label, fontSize: 18, fontWeight: "600" }}>
              Results
            </Text>
            <Text style={{ color: AC.secondaryLabel, fontSize: 16 }}>
              {"No results yet"}
            </Text>
          </View>
        </FormItem>
      </FormList>
    </BodyScrollView>
  );
}

function FadeInTest() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Text onPress={() => setShow(!show)}>Toggle</Text>
      {show && (
        <FadeIn>
          <Text>FadeIn</Text>
        </FadeIn>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: AC.label,
  },
  subtitle: {
    fontSize: 36,
    color: AC.secondaryLabel,
  },
});
