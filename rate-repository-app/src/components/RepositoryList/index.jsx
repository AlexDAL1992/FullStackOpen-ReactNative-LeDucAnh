import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";

import RepositoryCard from "./RepositoryCard";
import useRepositories from "../../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const orderOptions = [
  { label: "Most rated repositories", value: "mostRatings" },
  { label: "Least rated repositories", value: "leastRatings" },
  { label: "Latest repositories", value: "latest" },
  { label: "Oldest repositories", value: "oldest" },
];

const orderValues = {
  mostRatings: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  leastRatings: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  oldest: { orderBy: "CREATED_AT", orderDirection: "ASC" },
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListMenu = ({ orderBy, onOrderBy }) => {
  return (
    <Picker onValueChange={onOrderBy} selectedValue={orderBy}>
      {orderOptions.map(({ value, label }) => (
        <Picker.Item key={value} label={label} value={value} />
      ))}
    </Picker>
  );
};

export const RepositoryListContainer = ({
  orderBy,
  onOrderBy,
  repositories,
}) => {
  const navigate = useNavigate();

  const onOpenRepo = (id) => {
    navigate(`/repositories/${id}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <RepositoryListMenu orderBy={orderBy} onOrderBy={onOrderBy} />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onOpenRepo(item.id)}>
          <RepositoryCard repository={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("latest");
  const { repositories } = useRepositories({
    ...orderValues[orderBy],
  });

  return (
    <RepositoryListContainer
      orderBy={orderBy}
      onOrderBy={(orderBy) => setOrderBy(orderBy)}
      repositories={repositories}
    />
  );
};

export default RepositoryList;
