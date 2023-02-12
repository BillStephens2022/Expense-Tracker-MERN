const { AuthenticationError } = require("apollo-server-express");
const { User, Transaction } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // me: User
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('transactions');
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    transactions: async (parent, args, context) => {
      if (context.user) {
        return await Transaction.find({}).populate('user').sort({ date: 'desc' });
      }
      
    
    },
  },
  Mutation: {
    // addUser
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login
    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // add a transaction
    addTransaction: async (parent, { date, amount, highLevelCategory, category, description }, context) => {
        if (context.user) {
            console.log('trying to add transaction!')
            const transaction = await Transaction.create(
                {
                  date,
                  amount,
                  highLevelCategory,
                  category,
                  description,
                  username: context.user.username 
                },
                // { new: true, runValidators: true }
            );

            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { transactions: transaction._id } }
            );

            return transaction;

        } else {
          throw new AuthenticationError("You need to be logged in!");
        }
    },
    // delete a transaction
//     deleteTransaction: async (parent, { transactionId }, context ) => {
//         if (context.user) {
//             return await User.findOneAndUpdate(
//                 { _id: context.user._id },
//                 { $pull: { transactions: { transactionId } } },
//                 { new: true, runValidators: true }
//             );
//         } else {
//           throw new AuthenticationError("You need to be logged in!");
//         }
        
//     }
  }
};

module.exports = resolvers;
