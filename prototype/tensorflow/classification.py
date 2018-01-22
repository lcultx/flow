

import tensorflow as tf
from tensorflow.examples.tutorials.mnist import input_data

#number 1 to 10 data

mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

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
        if activation_function is None:
            outputs = Wx_plus_b
        else:
            outputs = activation_function(Wx_plus_b)
            tf.summary.histogram(layer_name + '/outputs',outputs)            
        return outputs

def compute_accurary(v_xs,v_ys):
    global prediction
    y_pre = sess.run(prediction,feed_dict={xs:v_xs})
    corret_prediction = tf.equal(tf.argmax(y_pre,1),tf.argmax(v_ys,1))
    accurary = tf.reduce_mean(tf.cast(corret_prediction,tf.float32))
    result = sess.run(accurary,feed_dict={xs:v_xs,ys:v_ys})
    return result

xs = tf.placeholder(tf.float32,[None,784]) #28*28
ys = tf.placeholder(tf.float32,[None,10])

prediction = add_layer(xs,784,10,'layer1',activation_function=tf.nn.softmax)

cross_entropy = tf.reduce_mean(
    -tf.reduce_sum(ys*tf.log(prediction),
    reduction_indices=[1]))

train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)

sess = tf.Session()

sess.run(tf.initialize_all_variables())

for i in range(1000):
    batch_xs,batch_yx = mnist.train.next_batch(100)
    sess.run(train_step,feed_dict={xs:batch_xs,ys:batch_yx})
    if i % 50 == 0:
        print(compute_accurary(mnist.test.images,mnist.test.labels))