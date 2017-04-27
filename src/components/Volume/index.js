import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/index';
import * as toggleTypes from '../../constants/toggleTypes';
import Slider from 'react-rangeslider';
import ButtonInline from '../../components/ButtonInline';

function VolumeSlider({ volume, onChangeVolume }) {
  return (
    <Slider
      min={0}
      max={100}
      value={volume}
      orientation="horizontal"
      onChange={onChangeVolume}
      tooltip={false}
      />
  );
}

function Volume({ toggle, volume, onChangeVolume }) {
  const volumeClass = classNames(
    'volume',
    {
      //'volume-visible': toggle[toggleTypes.VOLUME]
      'volume-visible': true
    }
  );

  const isMuted = !volume;

  const onMute = isMuted ?
  () => onChangeVolume(70) :
  () => onChangeVolume(0);

  const muteClass = classNames(
    'fa',
    {
      'fa-volume-up': !isMuted,
      'fa-volume-off': isMuted,
    }
  );


  // origine
  // return (
  //   <div className={volumeClass}>
  //        <h2 className="volume-number">{volume}</h2>
  //        <VolumeSlider volume={volume} onChangeVolume={onChangeVolume}/>
  //       <div className="volume-muter">
  //         <ButtonInline onClick={onMute}>
  //           <i className={muteClass} />
  //         </ButtonInline>
  //       </div>
  //   </div>
  // );
  return (
    <div className={volumeClass}>
      <VolumeSlider volume={volume} onChangeVolume={onChangeVolume}/>
      <div className="volume-muter">
        <ButtonInline onClick={onMute}>
          <i className={muteClass} />
        </ButtonInline>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    toggle: state.toggle,
    volume: state.player.volume,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeVolume: bindActionCreators(actions.changeVolume, dispatch),
  };
}

Volume.propTypes = {
  onChangeVolume: PropTypes.func,
  volume: PropTypes.number,
  toggle: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Volume);
