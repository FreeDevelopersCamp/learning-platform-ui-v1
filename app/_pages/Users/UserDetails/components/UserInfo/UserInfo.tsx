import { Text, Group } from "@mantine/core";
import { IconPhoneCall, IconAt } from "@tabler/icons-react";
import { ResourceUserDto } from "@/apis/core/User/types";
import classes from "./UserInfo.module.css";
import Avatar from "@/components/Avatar";

interface Props {
  user?: ResourceUserDto;
}
function UserInfo({ user }: Props) {
  const name = Object.values(user?.personalInformation?.name || {}).join(" ");
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={user?.image} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="blue">
            @{user?.userName}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user?.contacts.email}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              ({user?.contacts.mobile.countryCode}){" "}
              {user?.contacts.mobile.mobile}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}

export default UserInfo;
