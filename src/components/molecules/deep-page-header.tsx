import { ChevronLeft } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type DeepPageHeaderProps = {
  title: string;
};
export default function DeepPageHeader(prop: DeepPageHeaderProps) {
  return (
    <View style={styles.container}>
      <ChevronLeft size={20} color={"gray"} />
      <Text>{prop.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
