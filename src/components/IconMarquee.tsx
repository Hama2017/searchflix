import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MovieIcon from '@mui/icons-material/Movie';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import VideocamIcon from '@mui/icons-material/Videocam';
import SearchIcon from '@mui/icons-material/Search';

const ICONS = [
  <MovieIcon />,
  <PlayCircleIcon />,
  <SearchIcon />,
  <LiveTvIcon />,
  <VideoLibraryIcon />,
  <LocalMoviesIcon />,
  <CameraRollIcon />,
  <OndemandVideoIcon />,
  <VideocamIcon />,
];

const TRACK = Array(20).fill(ICONS).flat();
const ANIMATION_DURATION = 18; // Adjust this value to speed up or slow down the marquee animation

function IconMarquee(props: React.AriaAttributes) {
  const theme = useTheme();

  return (
    <Box {...props} sx={styles.wrapper}>
      <Box sx={styles.track}>
        {TRACK.map((icon, i) => (
          <Box
            key={i}
            sx={{
              ...styles.icon,
              color: i % 3 === 0 ? theme.palette.primary.main : theme.palette.text.primary,
              opacity: i % 3 === 0 ? 0.9 : 0.15,
            }}
          >
            {icon}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default IconMarquee;

const styles = {
  wrapper: {
    flex: 1,
    overflow: 'hidden',
    ml: 3,
  },
  track: {
    display: 'flex',
    gap: 3,
    width: 'max-content',
    animation: `marquee ${ANIMATION_DURATION}s linear infinite`,
    '@keyframes marquee': {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(-20%)' },
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 28,
  },
};
