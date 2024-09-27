import Pusher from 'pusher-js';

// Create a Pusher instance
const pusher = new Pusher('5f950ee8879a3ee4e0ea', {
  cluster: 'mt1',
});

export type PusherCallback = (data: unknown) => void;

/**
 * Subscribe to a Pusher channel
 * @param {string} channelName The name of the channel to subscribe to
 * @param {string} eventName The name of the event to bind to
 * @param {PusherCallback} callback The callback to call when the event is triggered
 */
export const subscribeToChannel = (
  channelName: string,
  eventName: string,
  callback: PusherCallback
): void => {
  const channel = pusher.subscribe(channelName);
  channel.bind(eventName, callback);
};

/**
 * Unsubscribe from a Pusher channel
 * @param {string} channelName The name of the channel to unsubscribe from
 */
export const unsubscribeFromChannel = (channelName: string): void => {
  pusher.unsubscribe(channelName);
};

// Function to unsubscribe from all channels when the user closes the window
window.addEventListener('beforeunload', () => {
  pusher.disconnect();
});

