import React, { useLayoutEffect } from 'react';
import { View} from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';


 /** Target
 * 1. Add new participants (select contacts, add those contacts in DB, unique mobile , unregisterd)
 * 2. Share expense
 * 3. See details, history of payments
 */
const GroupItem = () => {
  const {params:{group}} = useRoute();
  return (
    <View></View>
  );
}

export default GroupItem;
