import queueList from "@/queues/queue_list";
import fileUploadSubscriber from "./file_upload_subscriber";

const subscribers = {
  [queueList.file_upload.name]: {
    name: queueList.file_upload,
    worker: fileUploadSubscriber,
  },
};

function startAllSubscribers() {
  for (const [subscriberName, subscriber] of Object.entries(subscribers)) {
    subscriber.worker.run();
  }
}

startAllSubscribers();
