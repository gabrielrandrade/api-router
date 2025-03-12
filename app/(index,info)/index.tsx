import React, { useEffect, useState } from "react";
import * as Form from "@/components/ui/Form";
import * as AC from "@bacons/apple-colors";
import { TextInput, View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "react-native";

export default function Page() {
  const colorScheme = useColorScheme();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const response = await fetch("/api/post");
    const data = await response.json();
    setPosts(data)
  }

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
          {posts.map((post) => (
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


