# Notes on Expo Modules
Response to [this Asana ticket](https://app.asana.com/0/1207709018444631/1209127792060028/f)

Okay, I just finished Expo’s tutorial on creating your own Expo Module (allows calling between native code in your app and your react code). 

## Issues I ran into and how I solved them:

- I immediately was getting errors on Step 2. The tutorial has you delete a types def file src/ExpoSettings.types.ts which broke an import in src/ExpoSettingsModule.ts. I just fixed this by deleting the import and setting the referenced type to any. This allowed npm run build on step 3 to execute without any errors.
On step 3, I initially tried to run the example app in the project’s root directory (I skipped running cd example because I got confused and thought the example dir was the root dir). This broke the whole app, so I deleted it and started over from scratch. On the next time around, I ran cd example and npx expo run:ios as described in the docs. I didn’t build android bc I don’t have android studio and don’t care to build for android atm. At first, npx expo run:ios didn’t work. I got a few confusing errors. Here’s the first I ran into: 

```
❌  (ios/Pods/Headers/Public/RCT-Folly/folly/portability/Config.h:20:10)

  18 |
  19 | #ifndef FOLLY_NO_CONFIG
> 20 | #include <folly/folly-config.h>
     |          ^ 'folly/folly-co
```
I was missing a library called folly, which is used by react-native. I spent a while looking through related rn gh issues to no avail. Eventually, I solved it by running npm cache clean --force, then npm cache verify, then npx expo install --fix, then npx expo prebuild --clean, then npx expo run:ios. I think I also deleted the node-modules and re-installed… Idk, I’ve run into so many random build issues in expo at this point, that it’s all a blur… But I got it all working eventually.

- All following Steps went smoothly.

## Here are my findings/takeaways:

- This is probably a great template to use for building modules.
- I want to spend less time diagnosing and fixing builds for expo apps. I think the solution is either dedicating some time to filling knowledge gaps or using EAS.

## Rant about broken Builds in Expo:
As with everything in the React Native ecosystem, I ran into build errors and misconfigurations which took me down rabbit holes. It’s a bit concerning for me that even Expo’s primary tutorial on their modules feature contained multiple errors with no documented solutions. It feels like the Expo build pipeline is so big and depends on so many individual pieces working correctly that it breaks at the drop of a hat, and the source of the problem is almost always some obscure C++ linking error or something. Then there are like 10 layers of caching which need to be discovered and reset, before your fixes will even be applied. It’s really been difficult for me to be as productive as I’d like using Expo because there is so much complexity under the hood, that a simple mis-configuration can be almost impossible to diagnose. I often find myself wishing I understood the internals better, so that these build errors wouldn’t seem so foreign. But there is so much to learn. 
Here are a few things related to Expo’s build process that I’d like to understand better:
- The differences (technical and practical) between the available build/dev options (This page and This Page really highlights how complex this is). There’s Expo Go, Development Builds (local and EAS), Bare Workflow, Orbit, etc…
- What is the difference between a Bare Workflow and a Development Build? I think Bare Workflow refers to an app that was built in vanilla React Native without Expo, but I’m not sure. A lot of the build issues I’ve ran into talk about the Bare Workflow and other things that seem React Native specific.
- Is Expo Doctor available outside EAS?
- Can EAS run locally? Does it charge for every build? What counts as a build? Does changing the react code cause an EAS build or only changing native code?
- Why does my app (the generated ios dir) not build in XCode? I’ve seen people doing this to diagnose build errors before, but I don’t know how to make it work.
I - want to try EAS because apparently it makes all this much easier and they have a free plan.
Properly configuring the app.json file, metro bundler, and typescript
Upgrading to the latest Expo SDK version
For Expo modules, why couldn’t I get the live activities module example building? Does an Expo module need to live outside the app that depends on it?

