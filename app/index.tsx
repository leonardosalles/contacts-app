import { useContacts } from "@/features/contacts/hooks/useContacts";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonIcon,
  ButtonText,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CloseIcon,
  FlatList,
  Heading,
  HStack,
  Icon,
  Input,
  InputField,
  Progress,
  ProgressFilledTrack,
  ScrollView,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";

type Contact = {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  number?: string;
  digits?: string;
}

export default function Home() {
  const { isLoading, error, data } = useContacts();

  const getContactName = (item: Contact) => {
    return item.name ?? `${item.firstName} ${item.lastName ?? ''}`
  };

  return (
    <View flex={1} backgroundColor="$white">
      <View px={"$4"}>
        <Progress value={90} w={"100%"} size="xs">
          <ProgressFilledTrack />
        </Progress>

        <View py={"$2"}>
          <Text size="3xl" bold>
            Select 6+ supporters
          </Text>
          <Text size="sm" color="$gray">
            Invite your biggest fans. Grandparents, aunts, uncles, and friends are
            common supporters. We'll send an invite for you.
          </Text>
        </View>

        {/* a Search component with his logic */}
        <View py={"$2"}>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            backgroundColor="$lightgrey"
          >
            <InputField placeholder="Search supporters" />
          </Input>
        </View>

        {/* a ContactList component with horizontal orientation */}
        <FlatList
          horizontal
          data={data?.contacts}
          renderItem={({ item }: any) => (
            <View p={"$2"}>
              <Avatar>
                <AvatarFallbackText>{getContactName(item)}</AvatarFallbackText>
                <AvatarImage
                  source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
                />
                <Button size="xs" w="$4" h="$4" bgColor="$grey" rounded="$xl" p={"$0"} position="absolute" right="-$2" top="$0">
                  <ButtonIcon ><Icon as={CloseIcon} m="$2" w="$4" h="$4" color="$white" /></ButtonIcon>
                </Button>
              </Avatar>
              <Text size="sm">{getContactName(item)}</Text>
            </View>
          )}
          h={"$32"}
        />

        {/* same ContactList component with vertical orientation */}
        <FlatList
          h={"100%"}
          data={data?.contacts}
          renderItem={({ item }: any) => (
            <VStack space="2xl" py={"$3"} w={"$full"}>
              {/* a ContactItem component with logic */}
              <HStack space="md">
                <Avatar>
                  <AvatarFallbackText>{getContactName(item)}</AvatarFallbackText>
                  <AvatarImage
                    source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
                  />
                  <AvatarBadge />
                </Avatar>

                <HStack flex={1} justifyContent="space-between" alignItems="center">
                  <VStack>
                    <Heading size="sm">{getContactName(item)}</Heading>
                    <Text size="sm">{item.number ?? item.digits}</Text>
                  </VStack>

                  <VStack>
                    <CheckboxGroup value={["0"]}>
                      <Checkbox value={"1"}>
                        <CheckboxIndicator>
                          <CheckboxIcon />
                        </CheckboxIndicator>
                      </Checkbox>
                    </CheckboxGroup>
                  </VStack>
                </HStack>
              </HStack>
            </VStack>
          )}
        />
      </View>

      <View px={16} position="absolute" bottom={"$8"} w="$full">
        <Button rounded={"$lg"} size="lg">
          <ButtonText>Continue</ButtonText>
        </Button>
      </View>
    </View>
  );
}
