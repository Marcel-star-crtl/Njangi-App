import { Call, Menu, VideoCall } from "@mui/icons-material";
import { Stack, Card, Avatar, IconButton, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../../temp/hooks/useFetch";

const ChatScreenForGroup = () => {
    const { ID } = useParams();
    const { data: group, error, isPending } = useFetch('http://localhost:8000/groups/' + ID);
    return ( 
        <Stack  flexGrow={1}>
        <Stack direction='row' alignItems='center' sx={{backgroundColor: 'primary.main', height: 60}}>
            <Stack ml={3}><Avatar /></Stack>
            <Stack flexGrow={1} sx={{height: 'inherit', cursor: 'pointer'}} onClick={() => alert('clicked')}>
                <Stack alignItems='center' spacing={0}>
                    {isPending && <CircularProgress color="secondary" size={30} sx={{marginTop: 2}}/>}

                    { group && <>
                        <Typography variant='h6' className="title-text" sx={{color: 'white'}}>
                    {group.name}
                    </Typography>
                    <Typography mb={2} color='secondary'>
                        {group.numberOfMembers} member{group.numberOfMembers != 1 ? 's': '' }
                    </Typography></> }

                </Stack>
            </Stack>
            <Stack direction='row'>
                <Stack direction='row' sx={{width: 'fit-content'}} mr={2}>
                    <IconButton>
                        <Call sx={{color: 'white'}}/>
                    </IconButton>
                    <IconButton>
                        <VideoCall sx={{color: 'white'}}/>
                    </IconButton>
                    <IconButton>
                        <Menu sx={{color: 'white'}}/>
                    </IconButton>
                </Stack>

            </Stack>
        </Stack>
        <Stack sx={{height: 40, backgroundColor: 'primary.light'}}>
            <Card>
            <Typography variant='body2' color='primary.dark' px={5} sx={{
             
            }}>
                {group && group.body}
            </Typography>
            </Card>
        </Stack>
        { (error || isPending ) && <Stack sx={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Typography color={error ? 'error': ''}>
                    {error ? error : <CircularProgress />}
                </Typography>
            </Stack>}
        <Stack flexGrow={1} alignItems='baseline'></Stack>
        <Stack sx={{height: 50, width: '100%', backgroundColor: 'primary.main'}}>

        </Stack>
        </Stack>
     );
}
 
export default ChatScreenForGroup;