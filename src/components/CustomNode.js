import {useState} from 'react';
import { Handle } from 'react-flow-renderer';
import {Box, TextField} from "@mui/material";
import {FolderOpen} from '@material-ui/icons'


function CustomNode({ data }) {
  const {id, label, edgePosition, type, notConnectable} = data;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(label)
  const toggleEditing = () => setIsEditing(!isEditing)
  const isSource = type === 'source'

  return (
    <Box display='flex' alignItems='center' p={2}>
      <Box display='flex' alignItems='center'>
        <Handle
          type={type}
          position={edgePosition}
          id={id}
          isValidConnection={() => !notConnectable}
        />
        {isSource &&
          <FolderOpen/>
        }
        <div>
          {isEditing ?
            <TextField
              onChange={(e) => setText(e.target.value)}
              value={text}
              variant="standard"
              onKeyDown={(e) => {
              if (e.key === 'Enter'){
                toggleEditing()
              }}}
              className='text-input'
            /> :
            <Box ml={isSource ? 1: 0} mr={isSource ? 0 : 1} onClick={toggleEditing}>{text}</Box>
          }
        </div>
        {!isSource &&
          <FolderOpen/>
        }
      </Box>
    </Box>
  );
}

export default CustomNode;
