#!/usr/bin/python
# -*- coding: UTF-8 -*-
# 过度自信 == 自负

'''
1.增加数据量
2.正规化 regularization
   L1: 
      y = Wx ;
      const = (Wx - real y)^2 + abs(W)
  
   L2: 
      y = Wx ;
      const = (Wx - real y)^2 + abs(W)^2
    
   L3: 
      y = Wx ;
      const = (Wx - real y)^2 + abs(W)^3
   L4: 
      y = Wx ;
      const = (Wx - real y)^2 + abs(W)^4

   Dropout 
   随机删除掉一些神经网络
  
  
  
'''


# Dropout demo
import tensorflow as tf
from sklearn.datasets import load_digits
from sklearn.cross_validation import train_test_split
from sklearn.preprocessing import LabelBinarizer


digits = load_digits()
X = digits.data
y = digits.target
y = LabelBinarizer().fit_transform(y)
X_trian,X_test,y_train,y_test = train_test_split(X,y,test_size=.3)


def add_layer(inputs,in_size,out_size,n_layer,activation_function=None):
    layer_name = 'layer%s' % n_layer
    with tf.name_scope('layer'):
        with tf.name_scope('weight'):
            Weights = tf.Variable(tf.random_normal([in_size,out_size]),name="W")
            tf.summary.histogram(layer_name + '/weights',Weights)
        with tf.name_scope('biases'):
            biases = tf.Variable(tf.zeros([1,out_size]) + 0.1,name="biases")
            tf.summary.histogram(layer_name + '/biases',biases)            
        with tf.name_scope('Wx_plus_b'):
            Wx_plus_b = tf.matmul(inputs,Weights) + biases
            Wx_plus_b = tf.nn.dropout(Wx_plus_b,keep_prob)
        if activation_function is None:
            outputs = Wx_plus_b
        else:
            outputs = activation_function(Wx_plus_b)
            tf.summary.histogram(layer_name + '/outputs',outputs)            
        return outputs


keep_prob = tf.placeholder(tf.float32) #多少结果不被drop掉
xs = tf.placeholder(tf.float32,[None,64]) #28*28
ys = tf.placeholder(tf.float32,[None,10])

l1 = add_layer(xs,64,50,'l1',activation_function=tf.nn.tanh)
prediction = add_layer(l1,50,10,'l2',activation_function=tf.nn.softmax)



cross_entropy = tf.reduce_mean(
    -tf.reduce_sum(ys*tf.log(prediction),
    reduction_indices=[1]))

tf.summary.scalar('loss',cross_entropy)
trian_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)


sess = tf.Session()
merged = tf.summary.merge_all()


train_writer = tf.summary.FileWriter('logs/train',sess.graph)
test_writer = tf.summary.FileWriter('logs/test',sess.graph)

sess.run(tf.initialize_all_variables())



for i in range(500):
    sess.run(trian_step,feed_dict={xs:X_trian,ys:y_train,keep_prob:0.5})
    if i % 50 == 0:
        #record loss
        train_result = sess.run(merged,feed_dict={xs:X_trian,ys:y_train,keep_prob:1.0})
        test_result = sess.run(merged,feed_dict={xs:X_test,ys:y_test,keep_prob:1.0})
        train_writer.add_summary(train_result,i)
        test_writer.add_summary(test_result,i)