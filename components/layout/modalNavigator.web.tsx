import React from "react";
import { Platform } from "react-native";
import {
  useNavigationBuilder,
  createNavigatorFactory,
  DefaultRouterOptions,
  StackRouter,
  StackNavigationState,
  ParamListBase,
} from "@react-navigation/native";
import {
  NativeStackView,
  NativeStackNavigationOptions,
  NativeStackNavigationHelpers,
} from "@react-navigation/native-stack";
import { Drawer } from "vaul";
import { withLayoutContext } from "expo-router";

type MyModalStackNavigationOptions = NativeStackNavigationOptions & {
  // If you have extra options, declare them here
};

type MyModalStackRouterOptions = DefaultRouterOptions & {
  // Extend if you need custom router logic
};

type Props = {
  initialRouteName?: string;
  screenOptions?: MyModalStackNavigationOptions;
  children: React.ReactNode;
};

function MyModalStackNavigator({
  initialRouteName,
  children,
  screenOptions,
}: Props) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder<
      StackNavigationState<ParamListBase>,
      MyModalStackRouterOptions,
      MyModalStackNavigationOptions,
      NativeStackNavigationHelpers
    >(StackRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <NavigationContent>
      <MyModalStackView
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </NavigationContent>
  );
}

/**
 * Filters out any "modal" screens from the normal <NativeStackView> on web,
 * so that those screens only appear in the vaul <Drawer>.
 */
function MyModalStackView({
  state,
  navigation,
  descriptors,
}: {
  state: StackNavigationState<ParamListBase>;
  navigation: NativeStackNavigationHelpers;
  descriptors: Record<
    string,
    {
      options: MyModalStackNavigationOptions;
      render: () => React.ReactNode;
    }
  >;
}) {
  // 1) Identify which routes are "modal" on web
  //    (On native, we do nothing special; it’s a normal native modal.)
  const isWeb = Platform.OS === "web";

  // These routes should go to <NativeStackView>
  const nonModalRoutes = state.routes.filter((route) => {
    const descriptor = descriptors[route.key];
    const { presentation } = descriptor.options || {};
    // Keep the route if:
    // - We are on native, or
    // - It's not a modal
    // => In other words, exclude if (web + modal)
    return !(isWeb && presentation === "modal");
  });

  // Recalculate `index` so that it doesn't point to a missing route.
  // If the current `state.index` is referencing a modal route on web,
  // that route won't exist in `nonModalRoutes`. We'll clamp it to the last route.
  let nonModalIndex = nonModalRoutes.findIndex(
    (r) => r.key === state.routes[state.index]?.key
  );
  if (nonModalIndex < 0) {
    // If the active route is excluded (i.e. it's a modal on web),
    // we set the active index to the last route in nonModalRoutes
    nonModalIndex = nonModalRoutes.length - 1;
  }

  const newStackState: StackNavigationState<ParamListBase> = {
    ...state,
    routes: nonModalRoutes,
    index: nonModalIndex,
  };

  return (
    <div data-vaul-drawer-wrapper="" style={{ flex: 1, display: "flex" }}>
      {/* 1) The usual <NativeStackView> for normal routes (and native modals). */}
      <NativeStackView
        state={newStackState}
        navigation={navigation}
        descriptors={descriptors}
      />

      {/* 2) On web, render a vaul Drawer for the top route if it's presentation='modal'. */}
      {isWeb &&
        state.routes.map((route, i) => {
          const descriptor = descriptors[route.key];
          const { presentation } = descriptor.options || {};

          // Only show the Drawer if this route is the *active* one and is "modal"
          const isActive = state.index === i && presentation === "modal";
          if (!isActive) return null;

          return (
            <Drawer.Root
              key={route.key}
              shouldScaleBackground
              open={true}
              onClose={() => navigation.goBack()}
            >
              <Drawer.Portal>
                <Drawer.Overlay
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                  }}
                />
                {/* https://vaul.emilkowal.ski/default#scrollable */}
                <Drawer.Content
                  style={{
                    position: "fixed",
                    display: "flex",
                    flexDirection: "column",

                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    maxHeight: "97%",

                    borderRadius: "8px 8px 0 0",
                    overflow: "hidden",
                  }}
                >
                  {/* Render the actual screen content for the modal route */}
                  {descriptor.render()}
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          );
        })}
    </div>
  );
}

/**
 * Create our custom navigator factory.
 * Wrap in expo-router's `withLayoutContext` if needed.
 */
const createMyModalStack = createNavigatorFactory(MyModalStackNavigator);

const RouterModal = withLayoutContext(createMyModalStack().Navigator);

export default RouterModal;
