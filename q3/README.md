# Q2 problem

This is not a working application, but has the logic in solving the problem:

- Created 2 job queues, one for processing the webhook(`webhook_queue`), the other for processing the sftp xml order files(`sftp_queue`)
- A cron job that runs every middle of the night, and downloads the sftp files. While looping the files, it passes the local path of the xml order file to `sftp_queue`. It will then parses the xml file and checks if order is existing, if it is, updates the order, if not, create order record in database.
- A POST request webhook handler is used for processing a product purchase or order. It passes the order details to the `webhook_queue`. If order is existing, call the ERP api, if not, requeue the job to the same queue.
