"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CalendarIcon, ChevronsUpDown, Plus, Minus, Trash2 } from "lucide-react"
import { format } from "date-fns"
// import axios from "axios"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiClient } from "@/app/Admin/Dashboard/utils/interceptors"
import NotificationDialog from "@/app/Admin/Dashboard/components/Notification/page"

interface Product {
  product_id: string
  product_name: string
  per_item_rate: number
  quantity: number
  gst_rate: number
  entry_type: string
}

interface ProductOption {
  id: string
  name: string
  price: number
  gst: number
  image: string
}

type EntryType = "cash" | "crate" | "missing" | "return"
type DeliveryStatus = "delivered" | "placed"
type PaymentStatus = "pending" | "paid"

export default function ReturnOrderForm(props: any) {
  const selectedOrder = props.selectedOrder || {}
  const [orderId, setOrderId] = useState<string>("")
  const [humanReadableId, setHumanReadableId] = useState<string>("")
  const [orderDate, setOrderDate] = useState<Date>(new Date())
  const [distributor, setDistributor] = useState<string>("")
  const [orderItems, setOrderItems] = useState<Product[]>([])
  const [openProductCombobox, setOpenProductCombobox] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [productOptions, setProductOptions] = useState<ProductOption[]>([])
  const [userID, setUserID] = useState<string>("")
  const [txnToken, setTxnToken] = useState<string>("")
  const [token, setToken] = useState<string>("")
  const [walletId, setWalletId] = useState<string>("")
  const [entryType, setEntryType] = useState<EntryType>("return")
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>("delivered")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending")
  const [shouldFetchProducts, setShouldFetchProducts] = useState(false)
  const [orderItemsSummary, setOrderItemsSummary] = useState<string>("")
  const [notification, setNotification] = useState<{
    isOpen: boolean
    title: string
    description: string
    type: "success" | "error"
  }>({ isOpen: false, title: "", description: "", type: "success" })

  const baseUrl = "https://dairy-marketing.mitrsewa.com/api"
  const onClose = props.onClose

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""
    setToken(storedToken)
  }, [])

  useEffect(() => {
    if (selectedOrder) {
      setOrderId(selectedOrder.id || "")
      setHumanReadableId(selectedOrder.humanReadableID || "")
      setOrderDate(selectedOrder.date || new Date())
      setDistributor(selectedOrder.distributorName || "")
      setUserID(selectedOrder.userId || "")
      setOrderItemsSummary(selectedOrder.orderlist || "")
    }
  }, [selectedOrder])

  useEffect(() => {
    if (userID) {
      setWalletId(`${userID}::user::txn`)
    }
  }, [userID])

  useEffect(() => {
    const fetchTxnToken = async () => {
      if (walletId && token) {
        try {
          const response = await apiClient.post(
            `${baseUrl}/v1/wallet/initiateTransaction/${walletId}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          const newTxnToken = response.data.data?.token || ""
          setTxnToken(newTxnToken)
        } catch (error: any) {
          console.error("Error initiating transaction:", error)
          const errorMessage = error.response?.data?.message || "An error occurred while submitting the order"
          setNotification({ isOpen: true, title: "Error", description: errorMessage, type: "error" })
        }
      }
    }

    fetchTxnToken()
  }, [walletId, token, baseUrl])

  useEffect(() => {
    const fetchProducts = async () => {
      if (!shouldFetchProducts || !userID || !token) return

      try {
        setIsLoading(true)
        let products: ProductOption[] = []

        switch (entryType) {
          case "cash":
            const [coinResponse, noteResponse] = await Promise.all([
              apiClient.get(`${baseUrl}/v1/product/byCategory/Coin`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              apiClient.get(`${baseUrl}/v1/product/byCategory/Note`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
            ])

            const coinProducts = mapProductsFromResponse(coinResponse.data)
            const noteProducts = mapProductsFromResponse(noteResponse.data)
            products = [...coinProducts, ...noteProducts]
            break

          case "crate":
            const crateResponse = await apiClient.get(`${baseUrl}/v1/product/byCategory/Crate`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            products = mapProductsFromResponse(crateResponse.data)
            break

          case "missing":
          case "return":
            const response = await apiClient.get(`${baseUrl}/v1/product/getRatesWithPhoto/${userID}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            products = mapProductsFromResponse(response.data)
            break
        }

        setProductOptions(products)
      } catch (error: any) {
        console.error(`Error fetching products for ${entryType}:`, error)
        const errorMessage = error.response?.data?.message || "An error occurred while fetching products"
        setNotification({ isOpen: true, title: "Error", description: errorMessage, type: "error" })
      } finally {
        setIsLoading(false)
        setShouldFetchProducts(false) // Reset the flag to prevent infinite loops
      }
    }

    if (shouldFetchProducts && userID && token) {
      fetchProducts()
    }
  }, [shouldFetchProducts, entryType, userID, token, baseUrl])

  const mapProductsFromResponse = (responseData: any): ProductOption[] => {
    if (!responseData || !responseData.data || !Array.isArray(responseData.data)) {
      return []
    }

    return responseData.data.map((product: any) => ({
      id: product.ID || product.product_id,
      name: product.Name || product.product_name,
      price: product.Rate || product.per_item_rate || 0,
      gst: product.GSTPercent || product.gst_rate || 0,
      image: product.photo_url || "",
    }))
  }

  const handleEntryTypeChange = (value: string) => {
    setEntryType(value as EntryType)
    setShouldFetchProducts(true)
  }

  const addProduct = (product: ProductOption) => {
    const existingItem = orderItems.find((item) => item.product_id === product.id && item.entry_type === entryType)

    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.product_id === product.id && item.entry_type === entryType
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      )
    } else {
      const newProduct = {
        product_id: product.id,
        product_name: product.name,
        per_item_rate: product.price,
        quantity: 1,
        gst_rate: product.gst,
        entry_type: entryType,
      }

      setOrderItems([...orderItems, newProduct])
    }
  }

  const updateQuantity = (productId: string, entryType: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      return
    } else {
      setOrderItems(
        orderItems.map((item) => {
          if (item.product_id === productId && item.entry_type === entryType) {
            return { ...item, quantity: newQuantity }
          }
          return item
        }),
      )
    }
  }

  const removeItem = (productId: string, entryType: string) => {
    setOrderItems(orderItems.filter((item) => !(item.product_id === productId && item.entry_type === entryType)))
  }

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + (item.per_item_rate || 0) * item.quantity, 0)
  }

  const calculateGST = () => {
    return orderItems.reduce((total, item) => {
      const itemSubtotal = (item.per_item_rate || 0) * item.quantity
      return total + itemSubtotal * ((item.gst_rate || 0) / 100)
    }, 0)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (orderItems.length === 0) {
      return
    }

    setShowConfirmation(true)
  }

  const finalizeOrder = async () => {
    try {
      setIsLoading(true)

      const returnOrderData = {
        user_id: userID,
        order_data: orderItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          entry_type: item.entry_type,
        })),
        onward_order_id: orderId,
        payment_status: paymentStatus,
        token: txnToken,
        order_status: deliveryStatus,
      }

      const response = await apiClient.post(`${baseUrl}/v1/order/admin/return/addOrder`, returnOrderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        setShowConfirmation(false)
        setNotification({
          isOpen: true,
          title: "Success",
          description: "Order submitted successfully",
          type: "success",
        })
        onClose()
      }
    } catch (error: any) {
      console.error("Error submitting return order:", error)
      const errorMessage = error.response?.data?.message || "An error occurred while submitting the order"
      setNotification({ isOpen: true, title: "Error", description: errorMessage, type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  const getEntryTypeColor = (type: string) => {
    switch (type) {
      case "cash":
        return "bg-blue-100 text-blue-800"
      case "crate":
        return "bg-green-100 text-green-800"
      case "missing":
        return "bg-red-100 text-red-800"
      case "return":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const parseOrderItemsSummary = (summary: string) => {
    return summary
      .split(",")
      .map((item) => item.trim().replace(/:$/, "")) // remove trailing colon
      .filter((item) => item)
      .map((item) => {
        const match = item.match(/^(.+?)\s*$$(.+?)$$\s*(Crate)?\s*x\s*(\d+)$/i)
        if (match) {
          const product = match[3]
            ? `${match[1].trim()} ${match[3]}` // "DTM Crate"
            : match[1].trim() // "Light Dahi"
          return {
            product,
            spec: match[2], // "170ml x 50"
            quantity: match[4], // "4"
          }
        }
        return null
      })
      .filter((item): item is { product: string; spec: string; quantity: string } => item !== null)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full min-w-[80vw] max-h-[80vh] mx-auto border rounded-lg shadow-sm overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Return Order</h2>
            <p className="text-sm text-muted-foreground">Create a return order for existing order</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">Original Order ID:</p>
            <p className="font-medium">{humanReadableId}</p>
          </div>
        </div>

        <hr />
        {parseOrderItemsSummary(orderItemsSummary).length > 0 ? (
          <div className="overflow-x-auto rounded border border-gray-200 shadow-sm mt-4">
            <span>
              {" "}
              <p className="mx-3 my-3">Delivered Order Summary:</p>
            </span>
            <table className="min-w-full table-auto">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left border-b">Sl No.</th>
                  <th className="px-4 py-2 text-left border-b">Product</th>
                  <th className="px-4 py-2 text-left border-b">Specification</th>
                  <th className="px-4 py-2 text-left border-b">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {parseOrderItemsSummary(orderItemsSummary).map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{idx + 1}</td>
                    <td className="px-4 py-2 border-b">{item.product}</td>
                    <td className="px-4 py-2 border-b">{item.spec}</td>
                    <td className="px-4 py-2 border-b">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No order items found.</p>
        )}

        <hr />

        <div className="p-6 space-y-6">
          {/* Date and Distributor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !orderDate ? "text-muted-foreground" : "",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {orderDate ? format(orderDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={orderDate}
                    onSelect={(date) => date && setOrderDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="distributor">Distributor</Label>
              <Input id="distributor" value={distributor} readOnly className="bg-muted" />
            </div>
          </div>

          {/* Status Selections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="delivery-status">Delivery Status</Label>
              <Select value={deliveryStatus} onValueChange={(value) => setDeliveryStatus(value as DeliveryStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="pending">Placed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-status">Payment Status</Label>
              <Select value={paymentStatus} onValueChange={(value) => setPaymentStatus(value as PaymentStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="entry-type">Entry Type</Label>
              <Select value={entryType} onValueChange={handleEntryTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="crate">Crate</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                  <SelectItem value="return">Return</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Add Products</Label>
              <Popover open={openProductCombobox} onOpenChange={setOpenProductCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openProductCombobox}
                    className="w-full justify-between"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading products..." : "Select products..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search products..." />
                    <CommandList>
                      <CommandEmpty>No product found.</CommandEmpty>
                      <CommandGroup>
                        {productOptions.map((product) => (
                          <CommandItem
                            key={product.id}
                            value={product.name}
                            onSelect={() => {
                              addProduct(product)
                              setOpenProductCombobox(false)
                            }}
                            className="flex items-center"
                          >
                            <div className="flex  gap-2 max-w-[20vw] ">
                              <div className="flex-1">
                                {product.image && (
                                  <Image
                                    width={40}
                                    height={40}
                                    src={product.image || "/placeholder.svg?height=32&width=32"}
                                    alt={product.name}
                                    className="w-8 h-8 rounded-md object-cover"
                                    loading="lazy"
                                  />
                                )}
                              </div>
                              <div>
                                <p>{product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  ₹{product.price ? product.price.toFixed(2) : "0.00"}
                                </p>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Selected Products Table */}
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading order details...</p>
            </div>
          ) : orderItems.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Entry Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems
                    .sort((a, b) => {
                      const entryTypeOrder = { cash: 1, crate: 2, missing: 3, return: 4 }
                      return (
                        entryTypeOrder[a.entry_type as keyof typeof entryTypeOrder] -
                        entryTypeOrder[b.entry_type as keyof typeof entryTypeOrder]
                      )
                    })
                    .map((item, index) => (
                      <TableRow
                        key={`${item.product_id}-${item.entry_type}-${index}`}
                        className={
                          index > 0 && item.entry_type !== orderItems[index - 1].entry_type ? "border-t-4" : ""
                        }
                      >
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>₹{item.per_item_rate ? item.per_item_rate.toFixed(2) : "0.00"}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getEntryTypeColor(
                              item.entry_type,
                            )}`}
                          >
                            {item.entry_type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product_id, item.entry_type, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = Number.parseInt(e.target.value)
                                if (!isNaN(val) && val > 0) {
                                  updateQuantity(item.product_id, item.entry_type, val)
                                }
                              }}
                              className="w-16 h-8 text-center"
                              min="1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product_id, item.entry_type, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>₹{((item.per_item_rate || 0) * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeItem(item.product_id, item.entry_type)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 border rounded-md">
              <p className="text-muted-foreground">
                No products added yet. Please add products from the dropdown above.
              </p>
            </div>
          )}

          {/* Order Summary */}
          {orderItems.length > 0 && (
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (varies per product):</span>
                <span>₹{calculateGST().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t">
          <Button type="submit" className="w-full" disabled={isLoading || !orderDate || orderItems.length === 0}>
            {isLoading ? "Loading..." : "Submit Return Order"}
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Return Order Confirmation</AlertDialogTitle>
            <AlertDialogDescription>Please review the return order details before confirming.</AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4 space-y-6">
            {/* Order Header */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Original Order ID:</p>
                <p className="font-medium">{humanReadableId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Return Date:</p>
                <p className="font-medium">{orderDate ? format(orderDate, "PPP") : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Distributor:</p>
                <p className="font-medium">{distributor || "N/A"}</p>
              </div>
            </div>

            {/* Status Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Delivery Status:</p>
                <p className="font-medium capitalize">{deliveryStatus}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Status:</p>
                <p className="font-medium capitalize">{paymentStatus}</p>
              </div>
            </div>

            {/* Products Table in Confirmation Dialog */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Entry Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems
                    .sort((a, b) => {
                      const entryTypeOrder = { cash: 1, crate: 2, missing: 3, return: 4 }
                      return (
                        entryTypeOrder[a.entry_type as keyof typeof entryTypeOrder] -
                        entryTypeOrder[b.entry_type as keyof typeof entryTypeOrder]
                      )
                    })
                    .map((item, index) => (
                      <TableRow
                        key={`${item.product_id}-${item.entry_type}-${index}`}
                        className={
                          index > 0 && item.entry_type !== orderItems[index - 1].entry_type ? "border-t-4" : ""
                        }
                      >
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>₹{item.per_item_rate ? item.per_item_rate.toFixed(2) : "0.00"}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getEntryTypeColor(item.entry_type)}`}
                          >
                            {item.entry_type}
                          </span>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          ₹{((item.per_item_rate || 0) * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (Included):</span>
                <span>₹{calculateGST().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total Amount:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={finalizeOrder} disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm Return Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <NotificationDialog
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        title={notification.title}
        description={notification.description}
        type={notification.type}
      />
    </form>
  )
}
