# Common components for Expo apps

Components that I use in Expo Router apps that are generally optimized for iOS, dark mode, and servers. Main part is the forms which look like Apple's settings app. These should be replaced with proper SwiftUI/Jetpack Compose in the future, but it's still useful to have JS versions for platforms that don't have native support.

<img src="https://github.com/user-attachments/assets/00903906-c8bf-42d2-81b7-337ba76ea890" width="128px">

<img src="https://github.com/user-attachments/assets/b550f9c1-2e01-4ec3-8050-450c33bfcce7" width="128px">

For best results, just copy the files to another project. Here are the other deps:

```
bunx expo install @bacons/apple-colors expo-web-browser expo-symbols expo-blur
```

## Stack

Use the correct stack header settings for peak iOS defaults:

```tsx
import Stack from "@/components/ui/Stack";
import ThemeProvider from "@/components/ui/ThemeProvider";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          title: "🥓 Bacon",
        }}
      />
    </ThemeProvider>
  );
}
```

Use `headerLargeTitle: true` to get the large header title.

## Forms

Start lists with a `<Form.List>` and add sections with `<Form.Section>`. Setting `navigationTitle="Settings"` will update the title of the stack header.

```tsx
<Form.List navigationTitle="Settings">
  <Form.Section title="Developer">
    <Form.Link target="_blank" href="https://evanbacon.dev">
      Evan Bacon
    </Form.Link>
    <Form.Link href="https://evanbacon.dev">Evan Bacon in browser</Form.Link>
  </Form.Section>
</Form.List>
```

<details>
  <summary>Internals</summary>

Form list is a wrapper around a scroll view with some extra styles and helpers.

```tsx
<BodyScrollView
  contentContainerStyle={{
    padding: 16,
    gap: 24,
  }}
>
  <Form.Section title="Developer">
    <Form.Link target="_blank" href="https://evanbacon.dev">
      Evan Bacon
    </Form.Link>
    <Form.Link href="https://evanbacon.dev">Evan Bacon in browser</Form.Link>
  </Form.Section>
</BodyScrollView>
```

</details>

## Form Sections

All top-level children will become items.

Add `title` and `footer` to a section. These can be strings or React nodes.

```tsx
import * as AC from "@bacons/apple-colors";

<Form.Section
  title="Header"
  footer={
    <Text>
      Help improve Search by allowing Apple to store the searches you enter into
      Safari, Siri, and Spotlight in a way that is not linked to you.{"\n\n"}
      Searches include lookups of general knowledge, and requests to do things like
      play music and get directions.{"\n"}
      <Link style={{ color: AC.link }} href="/two">
        About Search & Privacy...
      </Link>
    </Text>
  }
>
  <Text>Default</Text>
</Form.Section>;
```

## Form Items

- `Form.Text` has extra types for `hint` and custom styles to have adaptive colors for dark mode. The font size is also larger to match the Apple defaults.
- Adds the `systemImage` prop to append an SF Symbol icon before the text. The color of this icon will adopt the color of the text style.

```tsx
<Form.Text>Hey</Form.Text>
```

Add a hint to the right-side of the form item:

```tsx
<Form.Text hint="right">Left</Form.Text>
```

Add a custom press handler to the form item:

```tsx
<Form.Text
  onPress={() => {
    console.log("Pressed");
  }}
>
  Press me
</Form.Text>
```

## Form Link

Open with in-app browser using `target="_blank"` (only works when the `href` is an external URL):

```tsx
<Form.Link target="_blank" href="https://evanbacon.dev">
  Evan Bacon
</Form.Link>
```

Add a hint to the right-side of the form item:

```tsx
<Form.Link hint="123" href="/foo">
  Evan Bacon
</Form.Link>
```

Alternatively, use an HStack-type system instead of the `hint` hack:

```tsx
<Form.HStack>
  <Form.Text>Foo</Form.Text>
  <View style={{ flex: 1 }} />
  <Form.Text style={Form.FormFont.secondary}>Bar</Form.Text>
</Form.HStack>
```

Add a quick icon before the text:

```tsx
<Form.Link href="/two" systemImage="person.fill.badge.plus">
  Evan Bacon
</Form.Link>
```

Customize the color, size, etc:

```tsx
<Form.Link
  href="/two"
  systemImage={{
    name: "person.fill.badge.plus",
    color: AC.systemBlue,
    size: 128,
  }}
>
  Evan Bacon
</Form.Link>
```

## Form Description and Item

Add a list item with an image and text + description combo:

```tsx
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
    <Form.Text>Evan's iPhone</Form.Text>
    <Form.Text style={Form.FormFont.caption}>This iPhone 16 Pro Max</Form.Text>
  </View>

  {/* Spacer */}
  <View style={{ flex: 1 }} />

  <IconSymbol color={AC.systemBlue} name="person.fill.badge.plus" size={24} />
</Form.HStack>
```

Create a linkable version like this:

```tsx
<Form.Link href="/two">
  <View style={{ gap: 4 }}>
    <Form.Text>Evan's iPhone</Form.Text>
    <Form.Text style={Form.FormFont.caption}>This iPhone 16 Pro Max</Form.Text>
  </View>
</Form.Link>
```

## Colors

Be sure to use `@bacons/apple-colors` for high-quality P3 colors.

## Icons

Use the `IconSymbol` component to use Apple's SF Symbols.
