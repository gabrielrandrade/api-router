import React from "react";
import * as Form from "@/components/ui/Form";
import * as AC from "@bacons/apple-colors";
import { TextInput, View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "react-native";

export default function Page() {
  const colorScheme = useColorScheme();
  return (
    <View style={{ flex: 1 }}>
      <Form.List navigationTitle="Home">
        <Form.Section
          title="Create Post"
          footer="Create a post to share with your friends"
        >
          <Form.HStack>
            <TextInput
              placeholder="What's on your mind?"
              style={{
                flexGrow: 1,
                maxWidth: "80%",
                borderWidth: 1,
                borderColor: AC.separator,
                borderRadius: 8,
                padding: 12,
                color: colorScheme === "dark" ? "white" : "black",
              }}
            />
            <Form.Link href={"/(info)"}>
              {/*@ts-ignore*/}
              <IconSymbol name="sparkle" color={AC.systemOrange} />
            </Form.Link>
          </Form.HStack>
        </Form.Section>
        <Form.Section title="Recent Posts">
          {dummyPost.map((post) => (
            <Form.Link 
            href={"/two"} 
            key={post.id} 
            systemImage={post.isLiked ? "heart.fill" : "heart"}
            style={{
              overflow: "hidden",
              flexShrink: 1,
            }}
            >
              {post.text}
            </Form.Link>
          ))}
        </Form.Section>
      </Form.List>
    </View>
  );
}

const dummyPost = [
  {
    id: 1,
    text: "Just launched my new app!",
    isLiked: false,
  },
  {
    id: 2,
    text: "Working on some new Ui designs today",
    isLiked: true,
  },
  {
    id: 3,
    text: "Morning run complete!",
    isLiked: true,
  },
];
