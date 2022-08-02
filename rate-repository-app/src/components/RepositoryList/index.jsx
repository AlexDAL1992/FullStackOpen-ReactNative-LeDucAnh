import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";
import { Searchbar } from "react-native-paper";

import RepositoryCard from "./RepositoryCard";
import useRepositories from "../../hooks/useRepositories";
import theme from "../../theme";

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

const RepositoryListMenu = ({ orderBy, onOrderBy, search, onSearch }) => {
  return (
    <View>
      <Searchbar
        value={search}
        onChangeText={onSearch}
        placeholder="Type here to search ..."
        placeholderTextColor={theme.colors.placeholderTextColor}
      ></Searchbar>
      <Picker onValueChange={onOrderBy} selectedValue={orderBy}>
        {orderOptions.map(({ value, label }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  orderBy,
  onOrderBy,
  search,
  onSearch,
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
        <RepositoryListMenu
          orderBy={orderBy}
          onOrderBy={onOrderBy}
          search={search}
          onSearch={onSearch}
        />
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
  const [search, setSearch] = useState("");
  const [debounced] = useDebounce(search, 500);

  const { repositories } = useRepositories({
    ...orderValues[orderBy],
    searchKeyword: debounced,
  });

  return (
    <RepositoryListContainer
      orderBy={orderBy}
      onOrderBy={(orderBy) => setOrderBy(orderBy)}
      search={search}
      onSearch={(search) => setSearch(search)}
      repositories={repositories}
    />
  );
};

export default RepositoryList;
