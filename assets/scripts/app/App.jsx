import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import { DragDropContext } from 'react-dnd'
import flow from 'lodash/flow'
import NOTIFICATION from '../../../app/data/notification.json'

import NotificationBar from './NotificationBar'
import MenusContainer from '../menus/MenusContainer'
import StreetNameCanvas from '../streets/StreetNameCanvas'
import InfoBubble from '../info_bubble/InfoBubble'
import WelcomePanel from './WelcomePanel'
import PaletteContainer from '../palette/PaletteContainer'
import DialogRoot from '../dialogs/DialogRoot'
import StatusMessage from './StatusMessage'
import NoConnectionMessage from './NoConnectionMessage'
import EnvironmentEditor from '../streets/EnvironmentEditor'
import Flash from './Flash'
import DebugInfo from './DebugInfo'
import Gallery from '../gallery/Gallery'
import BlockingShield from './BlockingShield'
import BlockingError from './BlockingError'
import StreetView from './StreetView'
import SegmentDragLayer from '../segments/SegmentDragLayer'
import DebugHoverPolygon from '../info_bubble/DebugHoverPolygon'
import PrintContainer from './PrintContainer'
import ToastContainer from '../ui/Toasts/ToastContainer'
import { onResize } from './window_resize'

class App extends React.PureComponent {
  static propTypes = {
    locale: PropTypes.object
  }

  componentDidMount () {
    onResize()
  }

  render () {
    return (
      <IntlProvider
        locale={this.props.locale.locale}
        key={this.props.locale.locale}
        messages={this.props.locale.messages}
      >
        <>
          <NotificationBar locale={this.props.locale.locale} notification={NOTIFICATION} />
          <BlockingShield />
          <BlockingError />
          <Gallery />
          <Flash />
          <DebugInfo />
          <PrintContainer />
          <div className="main-screen">
            <MenusContainer />
            <StreetNameCanvas />
            <InfoBubble />
            <DebugHoverPolygon />
            <WelcomePanel />
            <PaletteContainer />
            <DialogRoot />
            <StatusMessage />
            <NoConnectionMessage />
            <EnvironmentEditor />
            <SegmentDragLayer />
            <StreetView />
            <ToastContainer setMessages={setMessages} />
          </div>
        </>
      </IntlProvider>
    )
  }
}

function setMessages (addMessage) {
  const items = [
    {
      message: 'Your street was reloaded from the server as it was modified elsewhere.'
    },
    {
      component: 'TOAST_UNDO',
      message: 'The segment has been removed.'
    },
    {
      component: 'TOAST_SIGN_IN',
      message: 'Now editing a freshly-made duplicate of the original street. Sign in to start your own gallery of streets.'
    },
    {
      type: 'success',
      title: 'Achievement unlocked!',
      message: 'Reach 100,000 people per hour street capacity.',
      action: 'More info'
    },
    {
      component: 'TOAST_NO_CONNECTION',
      type: 'warning',
      message: 'Streetmix is having trouble connecting to the Internet.',
      action: 'Retry connection',
      stay: true
    },
    {
      message: 'Nothing to undo.'
    }
  ]

  items.forEach((item, index) => {
    window.setTimeout(() => {
      addMessage(item)
    }, (index * 1000) + 5000)
  })
}

function mapStateToProps (state) {
  return {
    locale: state.locale
  }
}

export default flow(
  connect(mapStateToProps),
  DragDropContext(MultiBackend(HTML5toTouch))
)(App)
