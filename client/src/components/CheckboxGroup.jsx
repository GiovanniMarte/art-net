import { FormControl, FormLabel, Checkbox } from '@chakra-ui/react';
import { addCommunity, removeCommunity } from '../redux/artwork/artworkActions';
import { useSelector, useDispatch } from 'react-redux';

const CheckboxGroup = () => {
  const artwork = useSelector(state => state.artwork);
  const communities = useSelector(state => state.communities.list);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { checked, value } = event.target;
    const { id, name, badgeColor } = communities.find(community => community.id === value);
    const communityPreview = { id, name, badgeColor };
    if (checked) {
      dispatch(addCommunity(communityPreview));
    } else {
      dispatch(removeCommunity(communityPreview));
    }
  };

  return (
    <FormControl id="visibility" isRequired>
      <FormLabel as="legend">Comunidades</FormLabel>
      {communities.map(community => (
        <Checkbox
          onChange={handleChange}
          value={community.id}
          mr={3}
          key={community.id}
          isChecked={artwork.communities.some(communityPrev => communityPrev.id === community.id)}
        >
          {community.name}
        </Checkbox>
      ))}
    </FormControl>
  );
};

export default CheckboxGroup;
