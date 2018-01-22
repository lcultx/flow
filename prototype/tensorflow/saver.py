

import tensorflow as tf
from tensorflow.examples.tutorials.mnist import input_data
import numpy as np
#save to file
# W = tf.Variable([[1,2,3],[3,4,5]],dtype=tf.float32,name="weights")
# b = tf.Variable([[1,2,3]],dtype=tf.float32,name='biases')

# init = tf.initialize_all_variables()

# saver = tf.train.Saver()

# with tf.Session() as sess:
#     sess.run(init)
#     save_path = saver.save(sess,'mynet/save_net.skpt')
#     print("save to path %s",save_path)


#restore vriable
W = tf.Variable(np.arange(6).reshape((2,3)),dtype=tf.float32,name="weights")
b = tf.Variable(np.arange(3).reshape((1,3)),dtype=tf.float32,name='biases')

saver = tf.train.Saver()

with tf.Session() as sess:
    saver.restore(sess,'mynet/save_net.skpt')
    print('W',sess.run(W))
    print('b',sess.run(b))