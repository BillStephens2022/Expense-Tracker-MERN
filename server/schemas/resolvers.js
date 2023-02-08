const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const transactionSchema = require("../models/Transaction");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // me: User
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
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
    // save a transaction
    saveTransaction: async (parent, { ...transactionSchema }, context) => {
        if (context.user) {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: {
                        transactions: { ...transactionSchema },
                    },
                },
                { new: true, runValidators: true }
            );
        } else {
          throw new AuthenticationError("You need to be logged in!");
        }
    },
    // delete a transaction
    deleteTransaction: async (parent, { transactionId }, context ) => {
        if (context.user) {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { transactions: { transactionId } } },
                { new: true, runValidators: true }
            );
        } else {
          throw new AuthenticationError("You need to be logged in!");
        }
        
    }
  }
};

module.exports = resolvers;
