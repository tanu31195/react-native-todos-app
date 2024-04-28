# Setup

After checking out run

`npm install`

Then start expo using

`npx expo start --clear`

## Summary

I successfully implemented a feature-rich to-do list application tailored to the specified requirements using React Native with TypeScript. Key functionalities include:

- **Accordion UI**: Tasks are neatly categorized into three statuses: To Do, In Progress, and Done, providing clear visibility and organization.
- **Draggable Task List**: Enhancing user interaction, tasks can be reordered based on priority across different statuses, with the updated order persisting across sessions.
- **Swipeable Task Rows**: Tasks can be easily deleted or have their status updated through intuitive swipe actions, complemented by smooth animations for a polished UX.
- **Task Details Screen**: Offers functionality to update and delete tasks, ensuring all details are easily accessible and modifiable.
- **Haptic Feedback**: Integrated haptic feedback when changing task statuses or during drag-and-drop actions to enrich the tactile user experience.

### For data management and state persistence

- **Redux Toolkit** and **Redux Persist** were utilized to manage application state and maintain state between sessions, ensuring a seamless user experience.

### Additional technical insights

- I explored the integration of the **react-native-dnd-board** for drag-and-drop capabilities. However, due to the library's outdated status, further time is required to fully implement and optimize this feature.
- **NativeWind** was applied for styling basic components. My familiarity with NativeWind is growing, and I plan to extend its use to more complex components as I advance my expertise.
- The application architecture includes both a modal and a full-screen component for task creation, offering flexibility in user interaction.

### Areas for future enhancement

- Code Refinement: There is potential to simplify and refactor the StatusTaskList component for enhanced maintainability and performance.
- UI Components: Developing a common component library for UI elements such as buttons could streamline development and ensure consistency across the app.
- Theming and Accessibility: Implementing theming options and enhancing accessibility features will make the app more versatile and user-friendly.
- Code Optimization: Some duplicated code has been identified that can be consolidated to reduce complexity and improve efficiency.
- The application has been primarily tested on iOS, ensuring reliability and responsiveness on this platform.
